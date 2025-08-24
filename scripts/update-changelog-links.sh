#!/bin/bash

# Script to update symbolic links for changelog streams
# This ensures new changelog files are automatically included in the appropriate stream feeds

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "Updating changelog stream symbolic links..."

# Create directories if they don't exist
mkdir -p "$PROJECT_ROOT/changelogs-streams/lts"
mkdir -p "$PROJECT_ROOT/changelogs-streams/stable" 
mkdir -p "$PROJECT_ROOT/changelogs-streams/gts"

# Copy authors.yaml to each directory
cp "$PROJECT_ROOT/changelogs/authors.yaml" "$PROJECT_ROOT/changelogs-streams/lts/"
cp "$PROJECT_ROOT/changelogs/authors.yaml" "$PROJECT_ROOT/changelogs-streams/stable/"
cp "$PROJECT_ROOT/changelogs/authors.yaml" "$PROJECT_ROOT/changelogs-streams/gts/"

# Remove existing links (but not authors.yaml)
find "$PROJECT_ROOT/changelogs-streams/lts/" -type l -delete
find "$PROJECT_ROOT/changelogs-streams/stable/" -type l -delete
find "$PROJECT_ROOT/changelogs-streams/gts/" -type l -delete

echo "Creating symbolic links for LTS releases..."
find "$PROJECT_ROOT/changelogs" -name "*lts*" -type f -not -name "authors.yaml" -exec basename {} \; | while read file; do
    ln -sf "../../changelogs/$file" "$PROJECT_ROOT/changelogs-streams/lts/$file"
done

echo "Creating symbolic links for stable releases..."
find "$PROJECT_ROOT/changelogs" -name "*stable*" -type f -not -name "authors.yaml" -exec basename {} \; | while read file; do
    ln -sf "../../changelogs/$file" "$PROJECT_ROOT/changelogs-streams/stable/$file"
done

echo "Creating symbolic links for GTS releases..."
find "$PROJECT_ROOT/changelogs" -name "*gts*" -type f -not -name "authors.yaml" -exec basename {} \; | while read file; do
    ln -sf "../../changelogs/$file" "$PROJECT_ROOT/changelogs-streams/gts/$file"
done

echo "Symbolic links updated successfully!"

# Print summary
lts_count=$(find "$PROJECT_ROOT/changelogs-streams/lts/" -name "*.md" | wc -l)
stable_count=$(find "$PROJECT_ROOT/changelogs-streams/stable/" -name "*.md" | wc -l) 
gts_count=$(find "$PROJECT_ROOT/changelogs-streams/gts/" -name "*.md" | wc -l)

echo "Summary:"
echo "  LTS releases: $lts_count"
echo "  Stable releases: $stable_count"
echo "  GTS releases: $gts_count"