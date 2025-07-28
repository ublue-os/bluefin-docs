---
title: Universal Blue Ecosystem Overview
---

# Universal Blue Ecosystem Overview

Universal Blue is a comprehensive ecosystem of cloud-native Linux desktop images built on Fedora Atomic Desktop. Rather than being a single distribution, Universal Blue provides a family of purpose-built operating systems that share common foundations while targeting different use cases.

## Core Philosophy

All Universal Blue projects share these principles:

- **Immutable Infrastructure**: Built on Fedora Atomic Desktop for reliability and easy rollbacks
- **Container-Native**: Applications delivered via Flatpak, containers, and modern packaging
- **Cloud-Native Workflows**: Designed around modern development and deployment practices
- **Opinionated Defaults**: Curated experiences that reduce decision fatigue
- **Community-Driven**: Open source with active community involvement

## Major Projects

### Bluefin

**Target Audience**: Developers and power users who want a Ubuntu-like experience on Fedora

Bluefin is a developer-focused desktop featuring:

- GNOME desktop environment with Ubuntu-style workflow
- Developer tooling and containers built-in
- Strong focus on cloud-native development
- Homebrew package manager integration
- Excellent Framework laptop support

**Best for**: Software developers, DevOps engineers, and users wanting a modern Linux workstation

### Aurora

**Target Audience**: KDE enthusiasts and users wanting a polished desktop experience

Aurora provides:

- KDE Plasma desktop environment
- Same cloud-native foundation as Bluefin
- Tailored KDE experience with thoughtful defaults
- Gaming and multimedia capabilities
- Beautiful, modern interface

**Best for**: Users who prefer KDE Plasma, multimedia creators, and those wanting a visually stunning desktop

### Bazzite

**Target Audience**: Gamers and entertainment enthusiasts

Bazzite specializes in:

- Optimized gaming performance out of the box
- Steam, Lutris, and gaming tools pre-configured
- Support for gaming peripherals and hardware
- Multimedia codecs and proprietary drivers included
- Steam Deck optimization available

**Best for**: PC gamers, Steam Deck users, and entertainment-focused computing

### uCore

**Target Audience**: Server administrators and minimalist users

uCore offers:

- Minimal server-oriented base system
- Container-first approach for services
- Ideal for self-hosting and server deployments
- Lightweight foundation for custom builds
- OCI-native image management

**Best for**: Home servers, self-hosting enthusiasts, and custom image builders

### startingpoint

**Target Audience**: Organizations and users wanting custom images

startingpoint provides:

- Template for building custom Universal Blue images
- GitHub Actions automation for image building
- Customization examples and documentation
- Foundation for organizational or personal distributions

**Best for**: Organizations, advanced users, and anyone wanting to create custom images

### fleek

**Target Audience**: Users wanting reproducible development environments

fleek enables:

- Declarative dotfiles and home directory management
- Cross-machine synchronization of user environments
- Nix-based package management for user applications
- Git-based configuration management

**Best for**: Developers with multiple machines, users wanting reproducible environments

### devpod

**Target Audience**: Development teams and individual developers

devpod provides:

- Consistent development environments across teams
- IDE-agnostic remote development capabilities
- Cloud and local development environment management
- Integration with popular development tools

**Best for**: Development teams, remote developers, and users wanting isolated dev environments

## Technology Stack

All Universal Blue projects leverage:

- **Base**: Fedora Atomic Desktop (Silverblue/Kinoite)
- **Container Runtime**: Podman/Docker for application containers
- **Package Management**: Flatpak for desktop applications
- **System Updates**: rpm-ostree for atomic system updates
- **Build System**: GitHub Actions with container registries
- **Image Distribution**: OCI container registries

## Getting Started

1. **Choose Your Project**: Use the [comparison matrix](ecosystem-comparison) to find the right fit
2. **Download and Install**: Each project provides ISO images and installation guides
3. **Explore Integration**: Learn how projects work together in the [integration guide](ecosystem-integration)
4. **Join the Community**: Connect with other users in our [community resources](ecosystem-community)

## Why Universal Blue?

Traditional Linux distributions require users to make countless configuration decisions and maintain their systems manually. Universal Blue projects provide:

- **Maintenance-Free Experience**: Automatic updates with rollback capability
- **Consistent Environments**: Reproducible systems across installations
- **Modern Tooling**: Built for cloud-native development and deployment
- **Community Support**: Active communities and documentation
- **Future-Proof Architecture**: Built on emerging technologies and best practices

The Universal Blue ecosystem represents the future of Linux desktop computing—reliable, maintainable, and designed for modern workflows.
