# Bulk Changelog Generation Workflow

This document describes the GitHub Action workflow for generating bulk changelogs from Bluefin releases.

## Overview

The `generate-bulk-changelog.yml` workflow fetches the last 50 releases (or a custom number) from the `ublue-os/bluefin` repository, sorts them by published date (oldest first), and generates a comprehensive markdown changelog suitable for blog use.

## Features

- **Bulk Processing**: Fetches up to 50 releases (or custom amount) in a single run
- **Release Categorization**: Automatically categorizes releases as:
  - **GTS**: Releases with "gts" in the tag name
  - **Stable**: Regular stable releases (non-prerelease)
  - **Other/Pre-release**: Beta, alpha, or other prerelease versions
- **Date Sorting**: Sorts releases by published date (oldest first)
- **Markdown Generation**: Creates blog-ready markdown with frontmatter
- **Artifact Upload**: Uploads the generated changelog as a GitHub Actions artifact

## Usage

### Manual Trigger

The workflow can be triggered manually via GitHub Actions:

1. Go to the Actions tab in the repository
2. Select "Generate Bulk Changelog" workflow
3. Click "Run workflow"
4. Optionally specify the maximum number of releases (default: 50)
5. Click "Run workflow" to start

### Workflow Inputs

- `max_releases`: Maximum number of releases to fetch (default: 50, type: string)

## Output

The workflow generates:

1. **Changelog File**: A markdown file with blog frontmatter containing:
   - Release name and tag
   - Release type (GTS/Stable/Other)
   - Publish date
   - Release body/notes
   - Release summary statistics

2. **Artifact**: The generated markdown file is uploaded as an artifact named `bluefin-bulk-changelog-{run_number}`

3. **Summary**: A workflow summary showing:
   - Total releases processed
   - Breakdown by release type
   - Artifact information

## Changelog Format

The generated changelog includes:

```markdown
---
title: "Bluefin Release Changelog - Last X Releases"
slug: bluefin-bulk-changelog-TIMESTAMP
authors: [bluefin-release-bot]
tags: [release, bluefin, changelog, bulk]
---

This is a comprehensive changelog of the last X Bluefin releases, sorted by publish date (oldest first).

<!--truncate-->

## [Release Name](release_url)

**Tag:** `tag_name` | **Type:** Release_Type | **Published:** Date

Release body content...

---

## Release Summary

This changelog includes **X** releases:

- **GTS Releases:** Y
- **Stable Releases:** Z
- **Other/Pre-releases:** W
```

## Use Cases

- **Blog Content**: Generate comprehensive release summaries for blog posts
- **Documentation**: Create historical release documentation
- **Analysis**: Review release patterns and frequency
- **Archival**: Create snapshots of release history

## Technical Details

- **API**: Uses GitHub REST API v3
- **Pagination**: Handles multiple pages of releases automatically
- **Rate Limiting**: Respects GitHub API rate limits
- **Error Handling**: Comprehensive error checking and reporting
- **Sorting**: Uses jq for JSON processing and date sorting

## Permissions

The workflow requires:
- `contents: read` - To access repository and API data

No write permissions are needed as the output is only uploaded as an artifact.