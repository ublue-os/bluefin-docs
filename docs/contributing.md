---
title: Contributor's guide
slug: /contributing
---

# Contributing to Bluefin Documentation

Welcome! We're excited that you're interested in contributing to the Bluefin documentation. This guide will help you get started, whether you're fixing a typo, adding new content, or helping with major documentation improvements.

## Table of Contents

- [Quick Start](#quick-start)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Your First Contribution](#making-your-first-contribution)
- [Contribution Areas by Skill Set](#contribution-areas-by-skill-set)
- [Guidelines and Best Practices](#guidelines-and-best-practices)
- [Review Process](#review-process)
- [Getting Help](#getting-help)
- [Additional Resources](#additional-resources)

## Quick Start

**For small fixes (typos, broken links, etc.):**

1. Find what to work on via our [help wanted issues](https://github.com/issues?q=is%3Aopen+is%3Aissue+user%3Aublue-os+archived%3Afalse+label%3A%22help+wanted%22)
2. Click the "Edit this page" link at the bottom of any documentation page
3. Make your changes and submit a pull request

**For larger contributions:**

1. Set up the development environment (see [Development Setup](#development-setup))
2. Preview your changes locally
3. Submit a pull request with a clear description

All contributions are appreciated, from fixing typos to writing comprehensive guides!

## Getting Started

All types of contributions are encouraged and valued. This guide will help ensure an efficient review process and smooth experience for everyone involved.

The community looks forward to your contributions! If you like the project but don't have time to contribute, there are other ways to support us:

- Star the project
- Share it on social media (we 💙 Mastodon)
- Refer this project in your project's readme
- Mention the project at local meetups and tell your friends/colleagues

## Development Setup

This documentation site is built with [Docusaurus](https://docusaurus.io/), a modern static website generator. Here's how to set up your development environment:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [Git](https://git-scm.com/)

### Local Development Setup

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/bluefin-docs.git
   cd bluefin-docs
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run start
   ```

   This opens a browser window with live reload. Most changes are reflected live without having to restart the server.

4. **Build and test your changes**

   ```bash
   npm run build
   ```

   This command generates static content into the `build` directory and can be served using any static content hosting service.

### Alternative: Using Docker

If you prefer using containers:

```bash
docker compose up
```

### Format your changes

Before submitting, make sure to format all your files with Prettier:

```bash
npm run prettier
```

## Making Your First Contribution

### For Documentation Changes

1. **Identify what needs improvement**: Check our [issues](https://github.com/ublue-os/bluefin-docs/issues) or find areas that need updating
2. **Make your changes**: Edit the relevant `.md` files in the `docs/` directory
3. **Preview locally**: Use `npm run start` to see how your changes look
4. **Test the build**: Run `npm run build` to ensure everything compiles correctly
5. **Format your code**: Run `npm run prettier` to format your changes
6. **Submit a pull request**: Include a clear description of what you changed and why

### Adding New Pages

1. Create a new `.md` file in the appropriate directory under `docs/`
2. Add the frontmatter at the top:
   ```yaml
   ---
   title: Your Page Title
   ---
   ```
3. Update `sidebars.ts` if you want the page to appear in the navigation
4. Test your changes locally before submitting

### Working with Images and Assets

- Place images in the `static/img/` directory
- Reference them in markdown as `/img/your-image.png`
- Optimize images for web use before adding them

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](https://github.com/ublue-os/main?tab=coc-ov-file#readme). By participating, you are expected to uphold this code.

Please report unacceptable behavior to `jorge.castro@gmail.com`.

## Contribution Areas by Skill Set

We welcome contributors with different backgrounds and skill levels. Here are some areas where you can make a valuable impact:

### For Documentation Writers

**Perfect for:** Technical writers, users who want to share their experience, newcomers who can spot confusing areas

- Improve hardware compatibility guides
- Create tutorials for custom image building
- Cross-reference missing projects between repositories
- Update installation and troubleshooting guides
- Fix typos, broken links, and formatting issues
- Add missing information you wish you had when getting started
- Improve clarity and readability of existing content

### For Cloud Native/DevOps Engineers

**Perfect for:** Infrastructure professionals, container enthusiasts, CI/CD experts

As a cloud native project, we especially welcome contributors with skills in:

- **Podman/Docker** - Container build improvements
- **CI/CD & GitHub Actions** - Workflow optimization
- **Bash scripting** - Build script improvements
- **Justfile** - Build system enhancements (see [main repo justfile](https://github.com/ublue-os/main))

### For Package Maintainers

**Perfect for:** Linux package maintainers, system administrators

- Submit udev rules to [packages repo](https://github.com/ublue-os/packages)
- Help maintain the [Universal Blue COPR](https://copr.fedorainfracloud.org/coprs/ublue-os/packages/packages/)
- Package new applications for inclusion

### For Hardware Enthusiasts

**Perfect for:** Hardware testers, laptop users, gaming enthusiasts

- Test and document hardware compatibility
- Submit hardware enablement patches
- Help with Framework laptop and other specialized hardware support
- Document gaming setup and optimization

### For Community Members

**Perfect for:** Anyone who wants to help others

- Answer questions in [discussions](https://community.projectbluefin.io)
- Help newcomers in Discord
- Share your Bluefin experience and use cases
- Test pre-release features and provide feedback

## Getting Help

### I Have a Question

If you want to ask a question, we have several channels available:

- **[Discussion Forum](https://community.projectbluefin.io)** - Best for detailed questions and community discussion
- **[Discord Server](https://discord.gg/WEu6BdFEtp)** - Great for quick questions and real-time chat
- **[GitHub Discussions](https://github.com/ublue-os/bluefin-docs/discussions)** - For questions specific to this documentation repository
- **[GitHub Issues](https://github.com/ublue-os/bluefin-docs/issues)** - For bug reports and feature requests

### Troubleshooting Documentation Issues

**Common issues and solutions:**

- **Build fails locally**: Make sure you have Node.js 18+ installed and run `npm install` first
- **Prettier formatting errors**: Run `npm run prettier` to automatically fix formatting
- **Page not showing in navigation**: Check that you've updated `sidebars.ts` if needed
- **Images not displaying**: Ensure images are in `static/img/` and referenced correctly

**Still need help?** Don't hesitate to ask in our community channels - we're here to help!

## Guidelines and Best Practices

### General Contribution Guidelines

When contributing to this project, you must agree that:

- You have authored 100% of the content
- You have the necessary rights to the content
- The content you contribute may be provided under the project license

We follow the [Lazy Consensus](https://community.apache.org/committers/decisionMaking.html) model of development to keep the builds healthy and people happy:

- If you're looking for consensus to make a decision, post an issue for feedback and remember to account for timezones and weekends/holidays/work time
- The project wants people to be opinionated in their builds, so it's more of a loose confederation of repos than a top-down org
- Try not to merge your own stuff - ask for a review. At some point when the project has enough reviewers, we'll be turning on branch protection

Ashley Willis has a great introductory post called [How to Be a Good Open Source Contributor During Hacktoberfest and Beyond](https://dev.to/github/how-to-be-a-good-open-source-contributor-during-hacktoberfest-and-beyond-cdi) that has useful tips if you are just getting started.

### Documentation Style Guidelines

When writing or editing documentation:

- **Clarity first**: Avoid terms like "simply" or "easy" (see [justsimply.dev](https://justsimply.dev/) for more information)
- **Be inclusive**: Write for contributors of all experience levels
- **Be specific**: Provide actionable instructions rather than vague guidance
- **Use examples**: Include practical examples where helpful (e.g., commit message examples, command samples)
- **Stay consistent**: Use consistent terminology throughout
- **Link appropriately**: Link to relevant ublue-os resources and external documentation

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and enforce them with a bot to keep the changelogs tidy:

```
chore: add Oyster build script
docs: explain hat wobble
feat: add beta sequence
fix: remove broken confirmation message
refactor: share logic between 4d3d3d3 and flarhgunnstow
style: convert tabs to spaces
test: ensure Tayne retains clothing
```

## Review Process

### Submitting Pull Requests

**Before submitting a pull request:**

1. **Test your changes**: Run `npm run build` to ensure the site builds correctly
2. **Format your code**: Run `npm run prettier` to ensure consistent formatting
3. **Preview locally**: Use `npm run start` to verify your changes look correct
4. **Write a clear description**: Explain what you changed and why

**Best practices for pull requests:**

- Follow the directions of the pull request template if one is available. It will help those who respond to your PR.
- If a trivial fix such as a broken link, typo, or grammar mistake, review the entire document for other potential mistakes. Do not open multiple PRs for small fixes in the same document.
- Reference any issues related to your PR, or issues that PR may solve.
- Avoid creating overly large changes in a single commit. Instead, break your PR into multiple small, logical commits. This makes it easier for your PR to be reviewed.
  - Small commits and small pull requests get reviewed faster and are more likely to be correct than big ones.
  - Open a Different Pull Request for Fixes and Generic Features
- Comment on your own PR where you believe something may need further explanation.
- If your PR is considered a “Work in progress” [mark it as a draft](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/changing-the-stage-of-a-pull-request).

### Standard Pull Request Workflow

If you want to contribute documentation to the project, the general workflow is as follows:

1. [Fork the repository on GitHub](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository)
2. [Clone your fork to your local machine](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
3. Create a new branch in your local repository
4. Make your changes locally in your cloned repository's directory
5. Test your changes with `npm run start` and `npm run build`
6. Format your changes with `npm run prettier`
7. Commit your changes using [correctly formatted commit messages](#commit-messages)
8. Push your new branch to your GitHub fork
9. [Submit the pull request back to the original repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request#creating-the-pull-request)

If you're new to `git`, consider using a graphical user interface such as [GitHub Desktop](https://desktop.github.com/) to simplify these steps.

## Reporting Issues

### Before Submitting a Bug Report

A good bug report should describe the issue in detail. For documentation issues:

- **Check if it's already reported**: Search existing issues before creating a new one
- **Be specific**: Describe exactly what's wrong or missing
- **Provide context**: Include which page or section has the issue
- **Suggest improvements**: If you have ideas for how to fix it, include them

For broader Bluefin OS issues:

- Make sure that you are using the latest version
- Remember that these are unofficial builds - investigate whether it's a Bluefin issue or upstream Fedora issue
- Collect information about the bug:
  - `sudo bootc status` usually helps for OS issues
- Include image and version information
- Describe your input and the output
- Can you reliably reproduce the issue? Can you reproduce it with older versions?

### Why we use GitHub for issues

If you come to Discord, you might be asked to report an issue or start a discussion on GitHub. Don't panic! We do this for several important reasons:

**Scalability and asynchronous communication**: Open source is a worldwide phenomenon. Writing everything down and capturing as much data as possible is crucial to our ability to move quickly. Eventually we'll have people in every timezone, and keeping communication efficient is key.

**Better documentation**: Discord search isn't an engineering tool - it's for chat. It's extremely difficult for even experienced contributors to "spin up" by tracking a chat versus an issue on GitHub.

**Long-term efficiency**: It feels slow at first, but over the long term it's much more efficient. When you solve a problem in an issue, you're also solving it for as many people as possible.

**Tips for effective issue reporting**:

- Leverage chat for debugging and moving fast
- When discussions get over a few messages, start copying content into a text editor
- Then file an issue - you can always edit and improve it later, but concentrate on capturing the information first
- Don't be afraid of filing an issue! Part of our culture is to teach and help each other grow
- Better to file an issue and have it closed than let a subtle problem spiral out of control
- Having an issue closed means you've ruled something out, which can be just as important as finding a solution

If something needs more discussion, consider [filing a proposal](https://github.com/orgs/ublue-os/discussions?discussions_q=is%3Aopen+label%3Aproposal).

## Additional Resources

### Links for Contributors

- **[Open Pull Requests](https://github.com/pulls?user=ublue-os)** - All open PRs across ublue-os repositories
- **[Open Issues](https://github.com/issues?user=ublue-os)** - All open issues across ublue-os repositories
- **[Help Wanted Issues](https://github.com/issues?q=is%3Aopen+is%3Aissue+user%3Aublue-os+archived%3Afalse+label%3A%22help+wanted%22)** - Good first issues to work on
- **[All Published Containers](https://github.com/orgs/ublue-os/packages)** - Container images published by ublue-os

### Working with Bluefin OS Images

**Note**: This section applies to contributing to the main Bluefin OS, not this documentation site.

The minimum tools required are `git` and a working machine with `podman` enabled and configured. Building locally is much faster than building in GitHub and is a good way to move fast before pushing to a remote.

For detailed instructions on building Bluefin OS images locally, testing with container registries, and developing custom images, please refer to the [main ublue-os repository](https://github.com/ublue-os/main) contributing guide.

### Package Management

For contributors interested in package management:

- **Package pinning**: Sometimes there might be a regression in upstream Fedora that needs a fix. Packages can be "pinned" to a certain version in the main Containerfiles
- **Fedora partnership**: We endeavor to be a good partner to Fedora. Issues should be reported upstream when they're confirmed to be Fedora issues rather than Universal Blue issues
- **Upstream bug tracker**: [Fedora Silverblue Issue Tracker](https://github.com/fedora-silverblue/issue-tracker/issues)

### Organization Standards

This project follows the broader Universal Blue organization standards:

- We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for all repositories
- Documentation should avoid terms like "simply" or "easy" (see [justsimply.dev](https://justsimply.dev/))
- All contributions follow the [Lazy Consensus](https://community.apache.org/committers/decisionMaking.html) model
- We prioritize asynchronous communication and thorough documentation

### Getting More Involved

If you're interested in maintaining something or getting more involved in the project, let us know in our community channels! We're always looking for dedicated contributors who want to help make Bluefin better.

## Attribution

This guide is based on the **contributing.md** template. [Make your own](https://contributing.md/)!
