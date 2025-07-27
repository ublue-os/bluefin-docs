# Project Bluefin Documentation

[![License](https://img.shields.io/github/license/ublue-os/bluefin-docs)](https://github.com/ublue-os/bluefin-docs/blob/main/LICENSE)
[![Build Status](https://github.com/ublue-os/bluefin-docs/workflows/Build/badge.svg)](https://github.com/ublue-os/bluefin-docs/actions)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/ublue-os/bluefin-docs)

**A cloud-native Linux desktop operating system for developers**

This repository contains the documentation for [Project Bluefin](https://projectbluefin.io), an immutable, atomic desktop operating system built on Fedora Silverblue that provides a cloud-native development experience with container-first workflows.

## Table of Contents

- [About Bluefin](#about-bluefin)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Community](#community)
- [Roadmap](#roadmap)
- [Security](#security)
- [License](#license)
- [Maintainers](#maintainers)
- [Acknowledgments](#acknowledgments)

## About Bluefin

Bluefin is a next-generation Linux desktop operating system designed for cloud-native developers who need their machines to get work done. Built on the [Universal Blue](https://universal-blue.org) infrastructure and Fedora Silverblue/Kinoite, Bluefin provides a reliable, secure, and developer-focused computing experience.

### Key Features

- **Immutable & Atomic**: Image-based updates ensure system reliability and consistency
- **Container-First Workflows**: Native container integration with tools like Podman and Docker
- **Cloud-Native Development**: Pre-configured with modern development tools and practices
- **Zero Maintenance**: Automatic updates and self-healing system design
- **Developer Experience**: Dedicated [Developer Mode (bluefin-dx)](https://docs.projectbluefin.io/bluefin-dx) for enhanced development capabilities
- **Multiple Variants**:
  - Bluefin (GNOME desktop with Ubuntu-like layout)
  - Aurora (KDE Plasma desktop)
  - Framework variants optimized for Framework laptops

### Why Bluefin?

Bluefin addresses the needs of developers who want:

- A reliable workstation that "just works" without manual maintenance
- Modern cloud-native development workflows out of the box
- The stability of enterprise Linux with the latest development tools
- Seamless integration between desktop applications and containerized development

Bluefin follows the philosophy of being "purposely invisible" - providing a powerful platform that stays out of your way so you can focus on your work.

## Getting Started

### System Requirements

- x86_64 (Intel/AMD) processor
- 4GB RAM minimum (8GB+ recommended)
- 25GB available disk space
- UEFI-capable hardware
- Secure Boot compatible

### Installation

1. **Download**: Get the latest Bluefin image from [projectbluefin.io](https://projectbluefin.io)
2. **Create Installation Media**: Use tools like Balena Etcher or Ventoy to create a bootable USB
3. **Install**: Boot from USB and follow the standard Fedora installation process
4. **First Boot**: The system will automatically configure itself on first boot

For detailed installation instructions, see our [Installation Guide](https://docs.projectbluefin.io/installation).

### Quick Start

After installation:

```bash
# Enable developer mode (optional, for development workflows)
ujust bluefin-dx

# Install applications via Flatpak
flatpak install flathub com.visualstudio.code

# Install command-line tools via Homebrew
brew install git nodejs python
```

## Documentation

This repository contains the complete documentation for Bluefin, built with [Docusaurus](https://docusaurus.io/). The documentation covers:

- **[Introduction](https://docs.projectbluefin.io/introduction)**: Feature overview and system design
- **[Installation Guide](https://docs.projectbluefin.io/installation)**: Step-by-step installation instructions
- **[Administration](https://docs.projectbluefin.io/administration)**: System management and configuration
- **[Developer Mode](https://docs.projectbluefin.io/bluefin-dx)**: Enhanced development environment setup
- **[FAQ](https://docs.projectbluefin.io/FAQ)**: Frequently asked questions and troubleshooting

### Previewing Documentation Changes

If you're contributing to the documentation:

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Or use Docker
docker compose up

# Format your changes
npm run prettier
```

## Contributing

We welcome contributions to both Bluefin and its documentation! Our project follows cloud-native development practices and emphasizes automation and sustainability.

### How to Contribute

1. **Read our [Code of Conduct](https://docs.projectbluefin.io/code-of-conduct)**
2. **Check our [Contributing Guide](https://docs.projectbluefin.io/contributing)**
3. **Join the conversation** in our community channels
4. **Pick an issue** or propose a new feature
5. **Submit a pull request** following our guidelines

### Documentation Guidelines

- Link to upstream documentation with brief summaries when possible
- Keep content concise - documentation should be consumable in one sitting
- Use clear, accessible language
- Include practical examples and use cases
- Test all code examples and instructions

### Development Setup

```bash
# Clone the repository
git clone https://github.com/ublue-os/bluefin-docs.git
cd bluefin-docs

# Install dependencies
npm install

# Start local development server
npm run start

# Build for production
npm run build
```

## Community

### Communication Channels

- **[Discourse Forum](https://universal-blue.discourse.group/c/bluefin/6)**: Primary discussion platform
- **[Discord](https://discord.gg/XjG48C7VHx)**: Real-time chat and community support
- **[GitHub Discussions](https://github.com/ublue-os/bluefin/discussions)**: Feature requests and development discussions
- **[Matrix](https://matrix.to/#/#ublue:matrix.org)**: Alternative chat platform

### Project Governance

Bluefin is part of the Universal Blue project ecosystem and follows open source best practices:

- **Transparent Development**: All decisions made in public channels
- **Community-Driven**: Features and direction guided by user needs
- **Sustainable Practices**: Focus on long-term maintainability over feature quantity
- **Upstream First**: Contribute improvements to upstream projects when possible

### Values

Our project is guided by core values:

- **Reliability**: Systems should work consistently and predictably
- **Sustainability**: Long-term thinking over short-term gains
- **Inclusivity**: Welcome contributors from all backgrounds and skill levels
- **Automation**: Reduce manual toil through intelligent automation
- **Transparency**: Open development and decision-making processes

## Roadmap

### Current Focus (2024)

- ✅ Stable Fedora 40 base with GNOME 46
- ✅ Enhanced developer experience with bluefin-dx
- ✅ Framework laptop optimization
- 🔄 Improved onboarding and user experience
- 🔄 Enhanced container development workflows
- 📋 Community feedback integration

### Future Goals

- 📋 Additional hardware platform support
- 📋 Enhanced cloud integration features
- 📋 Improved developer tooling automation
- 📋 Foundation or cooperative governance structure

For detailed roadmap information, see our [project discussions](https://github.com/ublue-os/bluefin/discussions).

## Security

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do not** create a public GitHub issue
2. **Email** security concerns to the maintainers (see [Maintainers](#maintainers) section)
3. **Include** detailed information about the vulnerability
4. **Allow** time for the team to investigate and address the issue

### Security Features

Bluefin includes several security-focused features:

- **Immutable Base System**: Prevents unauthorized system modifications
- **Secure Boot Support**: Ensures system integrity during boot
- **SELinux**: Mandatory access controls enabled by default
- **Container Isolation**: Development workloads isolated in containers
- **Automatic Updates**: Security patches applied automatically

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

The documentation content is licensed under Apache 2.0, while Bluefin itself incorporates components under various open source licenses. See the main [Bluefin repository](https://github.com/ublue-os/bluefin) for complete licensing information.

## Maintainers

- **Jorge Castro** ([@castrojo](https://github.com/castrojo)) - Project Lead & Community
- **Kyle Gospodnetich** ([@KyleGospo](https://github.com/KyleGospo)) - Engineering Lead
- **Documentation Team** - Community contributors maintaining documentation

For questions about the project direction or governance, please reach out through our community channels.

## Acknowledgments

### Built With

- **[Universal Blue](https://universal-blue.org)**: Container-native OS toolkit
- **[Fedora Project](https://fedoraproject.org)**: Upstream distribution foundation
- **[CNCF Ecosystem](https://www.cncf.io/)**: Cloud-native tools and practices
- **[Flathub](https://flathub.org)**: Application distribution platform

### Special Thanks

- The Fedora Silverblue/Kinoite teams for the immutable desktop foundation
- Universal Blue community for the container-native infrastructure
- GNOME and KDE communities for the desktop environments
- All contributors and community members who make this project possible

### Related Projects

- **[Universal Blue](https://github.com/ublue-os/main)**: Container-native operating system toolkit
- **[Aurora](https://getaurora.dev)**: KDE variant of the Bluefin experience
- **[Bazzite](https://bazzite.gg)**: Gaming-focused Universal Blue image
- **[Fedora Silverblue](https://silverblue.fedoraproject.org)**: Upstream immutable desktop

---

**Ready to experience the future of Linux desktop development?**

🚀 **[Get Started with Bluefin](https://projectbluefin.io)** | 📖 **[Read the Docs](https://docs.projectbluefin.io)** | 💬 **[Join the Community](https://universal-blue.discourse.group/c/bluefin/6)**
