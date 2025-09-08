# Auto-Merge Changelog Sync Workflow

## Overview

The `auto-merge-changelog-sync.yml` workflow provides automated synchronization of changelog entries from Bluefin releases with automatic merging capabilities. This workflow creates pull requests that automatically merge when all status checks pass, enabling fully automated release documentation while maintaining the ability for reviewers to examine changes.

## Key Features

### 🚀 **Auto-Merge Functionality**
- Automatically merges approved changelog PRs when all status checks pass
- Uses GitHub's GraphQL API for reliable auto-merge enablement
- Maintains reviewer oversight during status check periods
- Can be manually disabled if issues are detected

### 📦 **Multi-Repository Support**
- **ublue-os/bluefin**: Stable and GTS releases
- **ublue-os/bluefin-lts**: LTS releases
- Independent processing ensures one repository failure doesn't block others

### 🔄 **Trigger Methods**
- **Scheduled**: Daily at 6am ET (10:00 UTC)
- **Manual**: Workflow dispatch for on-demand execution
- **Event-driven**: Repository dispatch for real-time release notifications

### 📝 **Release Type Handling**
- **🚢 Stable**: Regular production releases
- **⭐ GTS**: Grand Touring Support releases (extended testing)
- **🔒 LTS**: Long Term Support releases

## Workflow Structure

### Core Steps

1. **Repository Checkout**: Fresh clone with full history
2. **Release Fetching**: Multi-repository API calls with error handling
3. **Release Processing**: Generate Docusaurus blog format changelogs
4. **Branch Creation**: Timestamped branch with descriptive naming
5. **PR Creation**: Comprehensive pull request with auto-merge enabled
6. **Status Reporting**: Detailed summary with processing results

### Permissions Required

```yaml
permissions:
  contents: write        # Create branches and commits
  pull-requests: write   # Create and manage pull requests
  checks: read          # Monitor status checks for auto-merge
  actions: read         # Access workflow run information
```

## Auto-Merge Implementation

### GraphQL API Usage

The workflow uses GitHub's GraphQL API for reliable auto-merge functionality:

```bash
mutation($pullRequestId: ID!) {
  enablePullRequestAutoMerge(input: {
    pullRequestId: $pullRequestId,
    mergeMethod: MERGE
  }) {
    pullRequest {
      autoMergeRequest {
        enabledAt
        enabledBy { login }
      }
    }
  }
}
```

### Status Check Requirements

Auto-merge will trigger when:
- All required status checks pass
- No merge conflicts exist
- Auto-merge hasn't been manually disabled
- No pending review requests for changes

### Safety Features

- **Reviewer Access**: Changes can be examined during status check period
- **Manual Override**: Auto-merge can be disabled if issues are found
- **Error Handling**: Failed auto-merge attempts are logged with suggestions
- **Fallback**: Manual merging remains available if auto-merge fails

## Output and Reporting

### Pull Request Content

Each auto-generated PR includes:
- **Summary Statistics**: Files created, skipped, errors
- **Repository Status**: Access information for each source repository
- **File Listings**: Detailed breakdown of all processed releases
- **Version Types**: Clear categorization of release types
- **Auto-merge Notice**: Status and expectations for automatic merging

### GitHub Summary

Workflow runs generate comprehensive step summaries with:
- Processing statistics and version type breakdowns
- Repository access status and error reporting
- Auto-merge status and next steps information
- Troubleshooting guidance for any issues encountered

## Usage Examples

### Manual Trigger
```bash
# Trigger via GitHub UI or API
gh workflow run auto-merge-changelog-sync.yml
```

### Repository Dispatch
```bash
# From release repositories
curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/ublue-os/bluefin-docs/dispatches \
  -d '{"event_type":"release-published","client_payload":{"tag_name":"stable-20250907","html_url":"..."}}'
```

## Configuration

### Author Mapping

The workflow automatically assigns appropriate authors based on release type:

```yaml
# Located in changelogs/authors.yaml
bluefin-release-bot:      # Stable releases
bluefin-gts-release-bot:  # GTS releases  
bluefin-lts-release-bot:  # LTS releases
```

### Branch Naming

Auto-merge branches use the pattern:
```
automerge/changelog-sync-{timestamp}
```

This distinguishes them from manual sync branches (`changelogs/bluefin-releases-sync-{timestamp}`).

## Monitoring and Troubleshooting

### Common Scenarios

1. **Auto-merge Disabled**: Repository settings may need adjustment
2. **GraphQL Errors**: Token permissions or API changes
3. **Status Check Failures**: Dependent on repository branch protection rules
4. **Rate Limiting**: GitHub API quota management

### Error Recovery

- **Failed Auto-merge**: Manual merging remains available
- **Processing Errors**: Individual release failures don't block others
- **Repository Access**: Comprehensive error reporting with suggestions

## Differences from Original Workflow

### Enhanced Auto-merge
- **Original**: REST API with limited reliability
- **New**: GraphQL API with proper error handling

### Improved Permissions
- **Original**: Basic contents/pull-requests write
- **New**: Additional checks/actions read for auto-merge monitoring

### Better Reporting
- **Original**: Basic PR creation notification
- **New**: Comprehensive summaries with auto-merge status

### Branch Naming
- **Original**: `changelogs/bluefin-releases-sync-*`
- **New**: `automerge/changelog-sync-*` for clear distinction

## Maintenance

### Regular Tasks
- Monitor auto-merge success rates
- Review GitHub API quota usage
- Update author mappings as needed
- Verify repository access permissions

### Updates Required When
- GitHub API changes affect GraphQL schema
- New release types are introduced
- Repository branch protection rules change
- Additional source repositories are added

## Security Considerations

- Uses `GITHUB_TOKEN` with minimal required permissions
- Auto-merge only triggers on passing status checks
- Manual override capabilities preserved
- Comprehensive audit trail in pull requests

---

This workflow enables fully automated release documentation while maintaining safety, oversight, and the flexibility to handle various edge cases and repository configurations.