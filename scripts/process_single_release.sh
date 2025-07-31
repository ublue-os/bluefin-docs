#!/bin/bash

# Script to process a single release and create changelog entry
# Usage: process_single_release.sh SOURCE_REPO RELEASE_TAG RELEASE_URL RELEASE_DATE RELEASE_NAME RELEASE_BODY RELEASE_PRERELEASE
# Exit codes: 0=success, 1=file already exists, 2=error

set -e

SOURCE_REPO="$1"
RELEASE_TAG="$2"
RELEASE_URL="$3"
RELEASE_DATE="$4"
RELEASE_NAME="$5"
RELEASE_BODY="$6"
RELEASE_PRERELEASE="$7"

if [[ -z "$SOURCE_REPO" || -z "$RELEASE_TAG" || -z "$RELEASE_DATE" ]]; then
    echo "Error: Missing required parameters"
    echo "Usage: process_single_release.sh SOURCE_REPO RELEASE_TAG RELEASE_URL RELEASE_DATE RELEASE_NAME RELEASE_BODY RELEASE_PRERELEASE"
    exit 2
fi

echo "Processing release: $RELEASE_TAG from $SOURCE_REPO"

# Parse date to YYYY-MM-DD format
FORMATTED_DATE=$(date -u -d "$RELEASE_DATE" '+%Y-%m-%d' 2>/dev/null || date -u -j -f '%Y-%m-%dT%H:%M:%SZ' "$RELEASE_DATE" '+%Y-%m-%d' 2>/dev/null || echo "$(date '+%Y-%m-%d')")

# Determine release type based on source repository and tag pattern
if [[ "$SOURCE_REPO" == "ublue-os/bluefin-lts" ]] || [[ "$RELEASE_TAG" == lts-* ]]; then
    RELEASE_TYPE="lts"
    RELEASE_TAG_DISPLAY="LTS"
    # Clean up the tag for filename (remove lts- prefix if present)
    CLEAN_TAG=$(echo "$RELEASE_TAG" | sed 's/^lts-//')
    # For LTS releases, slug tag is the same as clean tag
    SLUG_TAG="$CLEAN_TAG"
elif [[ "$RELEASE_TAG" == *"gts"* ]]; then
    RELEASE_TYPE="gts"
    RELEASE_TAG_DISPLAY="GTS"
    # Clean up the tag for filename (remove gts- prefix if present)
    CLEAN_TAG=$(echo "$RELEASE_TAG" | sed 's/^gts-//')
    # For GTS releases, slug tag is the same as clean tag
    SLUG_TAG="$CLEAN_TAG"
else
    RELEASE_TYPE="stable"
    RELEASE_TAG_DISPLAY="Stable"
    CLEAN_TAG="$RELEASE_TAG"
    # For stable releases, slug tag removes the stable- prefix to avoid double "stable"
    SLUG_TAG=$(echo "$RELEASE_TAG" | sed 's/^stable-//')
fi

# Remove 'v' prefix from tag if present for filename
CLEAN_TAG=$(echo "$CLEAN_TAG" | sed 's/^v//')
SLUG_TAG=$(echo "$SLUG_TAG" | sed 's/^v//')

# Generate filename based on release type
if [[ "$RELEASE_TYPE" == "lts" ]]; then
    FILENAME="$FORMATTED_DATE-lts-$CLEAN_TAG.md"
elif [[ "$RELEASE_TYPE" == "gts" ]]; then
    FILENAME="$FORMATTED_DATE-gts-$CLEAN_TAG.md"
else
    FILENAME="$FORMATTED_DATE-$CLEAN_TAG.md"
fi

# Create the changelog file path
CHANGELOG_FILE="changelogs/$FILENAME"

# Check if file already exists
if [[ -f "$CHANGELOG_FILE" ]]; then
    echo "WARNING: Changelog file already exists: $CHANGELOG_FILE"
    echo "SKIPPED: $SOURCE_REPO:$RELEASE_TAG - file already exists"
    echo "Skipping creation to avoid overwriting existing content"
    exit 0
fi

echo "Creating changelog entry: $CHANGELOG_FILE"

# Determine title prefix based on source repository
# For LTS releases, use "Bluefin" as prefix since RELEASE_TAG_DISPLAY already contains "LTS"
# This prevents duplication like "Bluefin LTS LTS 20250602"
if [[ "$SOURCE_REPO" == "ublue-os/bluefin-lts" ]]; then
    TITLE_PREFIX="Bluefin"
else
    TITLE_PREFIX="Bluefin"
fi

# Save release body to temporary file
echo "$RELEASE_BODY" > "/tmp/release_body_single.md"

# Extract Major packages table from release body
extract_major_packages_table() {
    local release_body="$1"
    local in_major_packages=false
    local table_content=""
    
    # Read line by line to extract the Major packages table
    while IFS= read -r line; do
        if [[ "$line" =~ ^###[[:space:]]*Major[[:space:]]*packages[[:space:]]*$ ]]; then
            in_major_packages=true
            table_content+="$line"$'\n'
        elif [[ "$in_major_packages" == true ]]; then
            if [[ "$line" =~ ^###[[:space:]] ]]; then
                # Found next section, stop extracting
                break
            else
                table_content+="$line"$'\n'
            fi
        fi
    done <<< "$release_body"
    
    echo "$table_content"
}

# Generate contextual summary based on release content
generate_contextual_summary() {
    local release_body="$1"
    local summary=""
    
    # Check for commit changes (count actual commit rows in the table)
    local commit_count=0
    local commit_output
    commit_output=$(echo "$release_body" | sed -n '/### Commits/,/### All Images/p' | grep "^| \*\*\[" 2>/dev/null | wc -l)
    commit_count=${commit_output// /}
    
    # Check for package updates in All Images section  
    local package_count=0
    local package_output
    package_output=$(echo "$release_body" | sed -n '/### All Images/,/### \[Dev Experience Images\]/p' | grep "^| 🔄" 2>/dev/null | wc -l)
    package_count=${package_output// /}
    
    local new_packages_main=0
    local new_main_output
    new_main_output=$(echo "$release_body" | sed -n '/### All Images/,/### \[Dev Experience Images\]/p' | grep "^| ✨" 2>/dev/null | wc -l)
    new_packages_main=${new_main_output// /}
    
    # Check for new packages in Dev Experience Images section
    local new_packages_dx=0
    local new_dx_output
    new_dx_output=$(echo "$release_body" | sed -n '/### \[Dev Experience Images\]/,/### How to rebase/p' | grep "^| ✨" 2>/dev/null | wc -l)
    new_packages_dx=${new_dx_output// /}
    
    local new_packages=$((new_packages_main + new_packages_dx))
    
    # Check for DX package updates (count non-header rows)
    local dx_updates=0
    local dx_output
    dx_output=$(echo "$release_body" | sed -n '/### Major DX packages/,/### Commits/p' | grep "^| \*\*" 2>/dev/null | wc -l)
    dx_updates=${dx_output// /}
    
    # Generate contextual summary
    if [[ $commit_count -gt 0 || $package_count -gt 0 || $dx_updates -gt 0 ]]; then
        summary="This release includes "
        
        local components=()
        if [[ $commit_count -gt 0 ]]; then
            if [[ $commit_count -eq 1 ]]; then
                components+=("1 commit with bug fixes and improvements")
            else
                components+=("$commit_count commits with bug fixes and improvements")
            fi
        fi
        
        if [[ $package_count -gt 0 ]]; then
            components+=("$package_count updated system packages")
        fi
        
        if [[ $new_packages -gt 0 ]]; then
            if [[ $new_packages -eq 1 ]]; then
                components+=("$new_packages new package")
            else
                components+=("$new_packages new packages")
            fi
        fi
        
        if [[ $dx_updates -gt 0 ]]; then
            components+=("developer experience enhancements")
        fi
        
        # Join components with commas and 'and'
        if [[ ${#components[@]} -gt 1 ]]; then
            local last_component="${components[-1]}"
            unset components[-1]
            if [[ ${#components[@]} -gt 1 ]]; then
                summary+="$(printf "%s, " "${components[@]}")"
                summary="${summary%, }, and $last_component"
            else
                summary+="${components[0]} and $last_component"
            fi
        else
            summary+="${components[0]}"
        fi
        
        summary+=". The major packages table below shows the key version updates included in this release."
    else
        summary="This release focuses on system stability and includes package updates. See the major packages table below for key version information."
    fi
    
    echo "$summary"
}

# Remove Major packages table and everything before commits from release body for remaining content
extract_remaining_content() {
    local release_body="$1"
    local in_major_packages=false
    local past_major_packages=false
    local content=""
    
    # Skip the auto-generated intro and major packages sections
    while IFS= read -r line; do
        if [[ "$line" =~ ^###[[:space:]]*Major[[:space:]]*packages[[:space:]]*$ ]]; then
            in_major_packages=true
            continue
        elif [[ "$in_major_packages" == true && "$line" =~ ^###[[:space:]] ]]; then
            # Found next section after Major packages
            in_major_packages=false
            past_major_packages=true
        fi
        
        # Skip the auto-generated intro lines
        if [[ "$line" =~ ^This[[:space:]]+is[[:space:]]+an[[:space:]]+automatically[[:space:]]+generated ]] || \
           [[ "$line" =~ ^From[[:space:]]+previous.*there[[:space:]]+have[[:space:]]+been ]] || \
           [[ "$in_major_packages" == true ]]; then
            continue
        fi
        
        # Include content after major packages section
        if [[ "$past_major_packages" == true ]]; then
            content+="$line"$'\n'
        fi
    done <<< "$release_body"
    
    echo "$content"
}

# Extract components
MAJOR_PACKAGES_TABLE=$(extract_major_packages_table "$RELEASE_BODY")
CONTEXTUAL_SUMMARY=$(generate_contextual_summary "$RELEASE_BODY")
REMAINING_CONTENT=$(extract_remaining_content "$RELEASE_BODY")

# Create the changelog file using printf to avoid YAML parsing issues
printf '%s\n' \
    '---' \
    'title: "TITLE_PREFIX RELEASE_TAG_DISPLAY CLEAN_TAG"' \
    'slug: bluefin-RELEASE_TYPE-SLUG_TAG' \
    'authors: [bluefin-release-bot]' \
    'tags: [release, bluefin, RELEASE_TYPE]' \
    '---' \
    '' \
    'CONTEXTUAL_SUMMARY_PLACEHOLDER' \
    '' \
    'MAJOR_PACKAGES_TABLE_PLACEHOLDER' \
    '' \
    '<!--truncate-->' \
    '' \
    'REMAINING_CONTENT_PLACEHOLDER' \
    '' \
    '---' \
    '' \
    '**Release Information:**' \
    '- **Release:** [RELEASE_TAG](RELEASE_URL)' \
    '- **Type:** RELEASE_TAG_DISPLAY' \
    '- **Date:** FORMATTED_DATE' \
    '- **Repository:** SOURCE_REPO' \
    '' \
    'For installation instructions and more information, visit the [Bluefin documentation](https://docs.projectbluefin.io/).' \
    > "$CHANGELOG_FILE"

# Replace placeholders in the file
sed -i "s/TITLE_PREFIX/$TITLE_PREFIX/g" "$CHANGELOG_FILE"
sed -i "s/RELEASE_TAG_DISPLAY/$RELEASE_TAG_DISPLAY/g" "$CHANGELOG_FILE"
sed -i "s/CLEAN_TAG/$CLEAN_TAG/g" "$CHANGELOG_FILE"
sed -i "s/SLUG_TAG/$SLUG_TAG/g" "$CHANGELOG_FILE"
sed -i "s/RELEASE_TYPE/$RELEASE_TYPE/g" "$CHANGELOG_FILE"
sed -i "s|RELEASE_TAG|$RELEASE_TAG|g" "$CHANGELOG_FILE"
sed -i "s|RELEASE_URL|$RELEASE_URL|g" "$CHANGELOG_FILE"
sed -i "s/FORMATTED_DATE/$FORMATTED_DATE/g" "$CHANGELOG_FILE"
sed -i "s|SOURCE_REPO|$SOURCE_REPO|g" "$CHANGELOG_FILE"

# Insert the contextual summary
echo "$CONTEXTUAL_SUMMARY" > "/tmp/contextual_summary.md"
sed -i "/CONTEXTUAL_SUMMARY_PLACEHOLDER/r /tmp/contextual_summary.md" "$CHANGELOG_FILE"
sed -i "/CONTEXTUAL_SUMMARY_PLACEHOLDER/d" "$CHANGELOG_FILE"

# Insert the major packages table
echo "$MAJOR_PACKAGES_TABLE" > "/tmp/major_packages_table.md"
sed -i "/MAJOR_PACKAGES_TABLE_PLACEHOLDER/r /tmp/major_packages_table.md" "$CHANGELOG_FILE"
sed -i "/MAJOR_PACKAGES_TABLE_PLACEHOLDER/d" "$CHANGELOG_FILE"

# Insert the remaining content
echo "$REMAINING_CONTENT" > "/tmp/remaining_content.md"
sed -i "/REMAINING_CONTENT_PLACEHOLDER/r /tmp/remaining_content.md" "$CHANGELOG_FILE"
sed -i "/REMAINING_CONTENT_PLACEHOLDER/d" "$CHANGELOG_FILE"

echo "Successfully created changelog file: $CHANGELOG_FILE"
echo "Release type: $RELEASE_TYPE"
echo "Generated filename: $FILENAME"

exit 0