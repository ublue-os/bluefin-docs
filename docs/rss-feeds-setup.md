# Stream-Specific RSS Feeds Setup

This document explains how the stream-specific RSS/Atom feeds are implemented and maintained.

## Overview

The Bluefin documentation site now provides separate RSS/Atom feeds for each release stream:

- **LTS** - Long Term Support releases
- **Stable** - Current stable releases  
- **GTS** - Grand Touring Support releases (previous stable)

## Implementation

The implementation uses multiple Docusaurus blog plugin instances, each pointing to separate directories that contain symbolic links to the appropriate changelog files from the main `changelogs/` directory.

### Directory Structure

```
changelogs/                    # Main changelog directory (used by workflows)
├── 2025-08-24-gts-20250824.md
├── 2025-08-24-stable-20250824.md  
├── 2025-06-02-lts-20250602.md
└── authors.yaml

changelogs-streams/            # Generated directories (gitignored)
├── lts/
│   ├── 2025-06-02-lts-20250602.md -> ../../changelogs/2025-06-02-lts-20250602.md
│   └── authors.yaml
├── stable/
│   ├── 2025-08-24-stable-20250824.md -> ../../changelogs/2025-08-24-stable-20250824.md
│   └── authors.yaml
└── gts/
    ├── 2025-08-24-gts-20250824.md -> ../../changelogs/2025-08-24-gts-20250824.md
    └── authors.yaml
```

### RSS Feed URLs

The following feed URLs are available:

- **All Changelogs**: 
  - RSS: https://docs.projectbluefin.io/changelogs/rss.xml
  - Atom: https://docs.projectbluefin.io/changelogs/atom.xml

- **LTS Only**:
  - RSS: https://docs.projectbluefin.io/changelogs/lts/rss.xml  
  - Atom: https://docs.projectbluefin.io/changelogs/lts/atom.xml

- **Stable Only**:
  - RSS: https://docs.projectbluefin.io/changelogs/stable/rss.xml
  - Atom: https://docs.projectbluefin.io/changelogs/stable/atom.xml

- **GTS Only**:
  - RSS: https://docs.projectbluefin.io/changelogs/gts/rss.xml
  - Atom: https://docs.projectbluefin.io/changelogs/gts/atom.xml

## Maintenance

### Automatic Updates

The `scripts/update-changelog-links.sh` script automatically creates and maintains the symbolic links. This script should be run:

1. Before builds in development
2. In CI/CD when new changelog files are added

### Manual Updates

To manually update the symbolic links:

```bash
./scripts/update-changelog-links.sh
```

This will:
1. Create the stream directories if they don't exist
2. Copy `authors.yaml` to each stream directory
3. Remove existing symbolic links
4. Create new symbolic links based on filename patterns
5. Display a summary of files in each stream

### Pattern Matching

Files are categorized by filename patterns:
- **LTS**: Contains `*lts*` in filename
- **Stable**: Contains `*stable*` in filename  
- **GTS**: Contains `*gts*` in filename

## Workflow Compatibility

This implementation is designed to work with existing GitHub workflows without requiring changes:

1. Workflows continue to place files in the main `changelogs/` directory
2. The symbolic link script can be run as a post-processing step
3. The `changelogs-streams/` directories are gitignored and regenerated as needed

## Docusaurus Configuration

The stream-specific feeds are implemented using multiple instances of the `@docusaurus/plugin-content-blog` plugin in `docusaurus.config.ts`:

```typescript
plugins: [
  // Main changelog plugin
  ["@docusaurus/plugin-content-blog", { 
    id: "changelogs",
    path: "./changelogs",
    routeBasePath: "changelogs",
    // ... other config
  }],
  
  // Stream-specific plugins
  ["@docusaurus/plugin-content-blog", {
    id: "changelogs-lts", 
    path: "./changelogs-streams/lts",
    routeBasePath: "changelogs/lts",
    // ... other config
  }],
  // ... similar for stable and gts
]
```

Each plugin instance generates its own RSS/Atom feeds automatically.