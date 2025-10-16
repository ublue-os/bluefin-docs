---
title: Bluefin Beta now available with GNOME 49
slug: bluefin-beta-f43
authors: castrojo
tags: [announcements]
---

Guardians, Bluefin Beta has been updated GNOME 49 on a to Fedora 43 base. The `bluefin:beta` tag now provides early access to the latest components.

## What's in Bluefin Beta?

Bluefin Beta (`bluefin:beta`) provides a preview of the next major release before it becomes stable. Then in a few weeks this will become the new `bluefin:stable`. 

### Major Component Updates

The beta includes significant updates to core system components:

- **GNOME 49**: The newest GNOME desktop environment with [new features and refinements](https://release.gnome.org/49/)
- **Fedora 43**: The latest Fedora release with updated packages and improvements
- **Linux Kernel**: Updated to the latest stable kernel version: FIXME

For detailed information about GNOME 49's new features, visit the [official GNOME 49 release notes](https://release.gnome.org/49/).

### Fedora 43 Information

For complete details about Fedora 43, check out the [Fedora Magazine announcement](https://fedoramagazine.org/announcing-fedora-43/).

## Coming to Stable

Several improvements are currently being tested and will be included when this beta becomes the next stable release:

- Font cleanup and optimization ([#3330](https://github.com/ublue-os/bluefin/pull/3330))
- Package modernization ([#3327](https://github.com/ublue-os/bluefin/pull/3327))
- Official Tailscale GUI support ([#3326](https://github.com/ublue-os/bluefin/pull/3326))
- bcache-tools removal ([#3299](https://github.com/ublue-os/bluefin/pull/3299))
- Terra repository cleanup ([#3218](https://github.com/ublue-os/bluefin/pull/3218))
- Default filesystem changes from btrfs to xfs ([#2949](https://github.com/ublue-os/bluefin/pull/2949))

## How to Access Beta

Users interested in testing the beta can manually rebase to the beta tag. The command depends on your current image variant.

### Standard Images

For regular Bluefin:
```bash
bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/bluefin:beta
```

For Bluefin DX:
```bash
bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/bluefin-dx:beta
```

### NVIDIA Images

For Bluefin with NVIDIA drivers:
```bash
bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/bluefin-nvidia-open:beta
```

For Bluefin DX with NVIDIA drivers:
```bash
bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/bluefin-dx-nvidia-open:beta
```

Note that beta images receive daily updates and may have occasional issues as they're tested before promotion to stable. To return to stable, use `ujust rebase-helper` and select your preferred stable channel.

## Current Version Matrix

|                      | `gts`     | `stable`   | `beta`     | `latest`   |
| -------------------- | --------- | ---------- | ---------- | ---------- |
| Fedora Version:      | 41        | 42         | 43         | 43         |
| GNOME Version:       | 47        | 48         | 49         | 49         |
| Target User:         | Most users| Enthusiasts| Testers    | Advanced   |
| System Updates:      | Weekly    | Weekly     | Daily      | Daily      |
| Kernel:              | Gated     | Gated      | Gated      | Ungated    |

## Stability Expectations

Beta images are tested but may have issues that haven't been discovered yet. Report any problems in the [Bluefin issue tracker](https://github.com/ublue-os/bluefin/issues). Testing and feedback help ensure a smooth stable release, so if you've got time to help out, jump in!

## More Information

- [Bluefin Documentation](https://docs.projectbluefin.io/)
- [GNOME 49 Release Notes](https://release.gnome.org/49/)
- [Fedora 43 Announcement](https://fedoramagazine.org/announcing-fedora-43/)
- [ublue-os/main Repository](https://github.com/ublue-os/main)

Thanks to everyone testing beta and providing feedback!
