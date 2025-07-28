---
title: Project Comparison Matrix
---

# Universal Blue Project Comparison

This matrix helps you choose the right Universal Blue project for your needs. All projects share the same reliable, immutable foundation but target different use cases.

## Quick Decision Guide

**I want to...**

- **Develop software professionally** → [Bluefin](#bluefin)
- **Use KDE Plasma with modern features** → [Aurora](#aurora)
- **Game on Linux with minimal setup** → [Bazzite](#bazzite)
- **Run a home server or self-host** → [uCore](#ucore)
- **Create a custom organization image** → [startingpoint](#startingpoint)
- **Manage dotfiles and dev environments** → [fleek](#fleek)
- **Set up team development environments** → [devpod](#devpod)

## Detailed Comparison

| Feature                  | Bluefin     | Aurora        | Bazzite          | uCore         | startingpoint      |
| ------------------------ | ----------- | ------------- | ---------------- | ------------- | ------------------ |
| **Desktop Environment**  | GNOME       | KDE Plasma    | KDE Plasma/GNOME | None (Server) | Customizable       |
| **Target Use Case**      | Development | Desktop Users | Gaming           | Servers       | Custom Images      |
| **Installation Size**    | ~4GB        | ~4GB          | ~6GB             | ~1GB          | Varies             |
| **Gaming Optimizations** | Basic       | Good          | Excellent        | None          | Optional           |
| **Developer Tools**      | Extensive   | Basic         | Basic            | Minimal       | Customizable       |
| **Multimedia Support**   | Good        | Excellent     | Excellent        | None          | Optional           |
| **Resource Usage**       | Medium      | Medium        | Medium-High      | Low           | Varies             |
| **Maintenance Level**    | Very Low    | Very Low      | Very Low         | Low           | Developer Required |

## Detailed Project Profiles

### Bluefin

**Perfect for**: Software developers, DevOps engineers, cloud-native development

**Strengths**:

- Ubuntu-like GNOME experience on Fedora
- Comprehensive developer tooling (VS Code, containers, CLI tools)
- Homebrew package manager integration
- Excellent Framework laptop support
- Cloud-native development workflows
- Professional development environment out of the box

**Includes**:

- Development containers and tooling
- Homebrew for additional packages
- Modern terminal with fish shell
- Git, Docker, and development utilities
- Professional fonts and theming

**Not ideal for**: Gaming-focused users, KDE enthusiasts, server deployments

---

### Aurora

**Perfect for**: Desktop users who prefer KDE, multimedia creators, users wanting a beautiful interface

**Strengths**:

- Polished KDE Plasma experience
- Excellent multimedia capabilities
- Beautiful theming and visual design
- Good gaming support
- Comprehensive desktop application ecosystem

**Includes**:

- KDE Plasma with curated configuration
- Multimedia codecs and tools
- Gaming capabilities via Steam/Lutris
- Professional applications
- Customizable desktop environment

**Not ideal for**: Developers needing extensive tooling, server use, minimalist setups

---

### Bazzite

**Perfect for**: PC gamers, Steam Deck users, entertainment systems

**Strengths**:

- Optimized gaming performance
- Comprehensive game compatibility
- Steam, Lutris, and gaming tools pre-configured
- Support for gaming hardware and peripherals
- Multimedia capabilities
- Steam Deck variant available

**Includes**:

- Gaming-optimized kernel and drivers
- Steam, Lutris, Heroic, and other gaming platforms
- Gaming peripherals support
- Multimedia codecs and tools
- Performance optimization tools

**Not ideal for**: Development-focused work, minimal systems, server deployments

---

### uCore

**Perfect for**: Home servers, self-hosting, container orchestration, minimal installations

**Strengths**:

- Minimal resource footprint
- Container-first architecture
- Server and self-hosting optimizations
- Clean foundation for custom builds
- Excellent for learning container technologies

**Includes**:

- Minimal base system
- Container runtime (Podman)
- Basic networking and system tools
- OCI-native image management

**Not ideal for**: Desktop use, gaming, users needing GUI applications

---

### startingpoint

**Perfect for**: Organizations creating custom images, advanced users, system builders

**Strengths**:

- Template for custom Universal Blue images
- GitHub Actions automation
- Flexible customization options
- Documentation and examples
- Foundation for organizational distributions

**Includes**:

- Build templates and GitHub Actions
- Customization examples
- Documentation for image creation
- Integration with Universal Blue ecosystem

**Not ideal for**: End users wanting ready-to-use systems, beginners

## Support Tools

### fleek

**Use with**: Any Universal Blue project

**Purpose**: Declarative dotfiles and home directory management

**Benefits**:

- Nix-based package management for user applications
- Git-based configuration synchronization
- Reproducible user environments across machines
- Complements any Universal Blue base system

### devpod

**Use with**: Any Universal Blue project (primarily Bluefin)

**Purpose**: Development environment management

**Benefits**:

- Consistent development environments
- Remote development capabilities
- Team environment standardization
- IDE-agnostic approach

## Migration Paths

**From Traditional Linux Distributions**:

- **Ubuntu/Pop!\_OS users** → Bluefin
- **openSUSE/KDE users** → Aurora
- **Gaming-focused distros** → Bazzite
- **Arch/Minimal setups** → uCore

**Between Universal Blue Projects**:

- All projects use the same user home directory structure
- Flatpak applications transfer seamlessly
- Container configurations are portable
- User data remains intact during switches

## Hardware Considerations

**Framework Laptops**: Bluefin (official community support)
**Gaming PCs**: Bazzite (optimized drivers and performance)
**Older Hardware**: uCore (minimal resource usage)
**Servers/VPS**: uCore (headless optimization)
**General Purpose**: Aurora or Bluefin based on desktop preference

## Choosing Your First Universal Blue Project

1. **Define your primary use case** (development, gaming, general desktop, server)
2. **Consider your desktop environment preference** (GNOME vs KDE vs headless)
3. **Evaluate your technical comfort level** (ready-to-use vs customization)
4. **Review hardware compatibility** (especially for gaming or specialized hardware)
5. **Start with the closest match** (you can always switch later!)

Remember: All Universal Blue projects can be installed side-by-side or switched between easily thanks to the shared foundation and user data compatibility.
