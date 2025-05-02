---
title: Installation
slug: /installation
---

# Installation Runbook

In order to set yourself up to success it's useful to plan out your Bluefin installation into phases so that you can avoid common pitfalls and poorly supported configurations. On Linux-friendly hardware usually just booting into the installation process and clicking through the recommended installer defaults is enough.

![installer](https://github.com/user-attachments/assets/74871635-bd23-456e-b874-ecaed59765d3)

But you can never be too sure, here's the nitty gritty in case you need it.

:::info[💙 Please do not send your loved ones to this page 💙]

This runbook is for experienced users who are installing Bluefin for someone else. It is intended to be technical.  

:::

Here is a short [runbook](https://www.pagerduty.com/resources/learn/what-is-a-runbook/) for the Bluefin installation process. Read the entirety of this documentation in order to ensure survival. (In case of a raptor attack).

## Requirements

Review the [Fedora Silverblue installation instructions](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/). Some differences to consider:

- Use the [Fedora Media Writer](https://flathub.org/apps/org.fedoraproject.MediaWriter) to create installation media. Other creation methods may not work properly.
- Dual booting off of the same disk is **unsupported**, use a dedicated drive for another operating system and use your BIOS to choose another OS to boot off of.
  - Bluefin supports a [installation on an external drive](/tips/#bluefin-to-go-using-an-external-drive) if you want to try it on bare metal before committing.
- We **strongly recommend** using automated partitioning during installation, there are [known issues](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/) with manual partition on Atomic systems and is unnecessary to set up unless you are on a multi-disk system.
- A stock Bluefin installation is 11GB. Bluefin with developer mode enabled (`bluefin-dx`) is 19GB.

## ISO Downloads

**Don't know what you need?**

- Go to [the website](https://projectbluefin.io)
- Press 'Try Out'
    - Fill in the form
- Download the ISO!

**Already know what you want?**

:::warning[These are not ready]

These ISOs are experimental, please [report issues](https://github.com/ublue-os/titanoboa/issues) if you want to help!

:::

### AMD/Intel

- Bluefin: [bluefin-live-stable-amd64.iso](https://download.projectbluefin.io/bluefin-live-stable-amd64.iso)
- Bluefin GTS: [bluefin-live-gts-amd64.iso](https://download.projectbluefin.io/bluefin-live-gts-amd64.iso)
- Bluefin LTS (Beta): [bluefin-lts.iso](https://download.projectbluefin.io/bluefin-lts.iso)

### Nvidia

- Bluefin: [bluefin-live-nvidia-open-stable-amd64.iso](https://download.projectbluefin.io/bluefin-live-nvidia-open-stable-amd64.iso)
- Bluefin GTS: [bluefin-live-nvidia-open-gts-amd64.iso](https://download.projectbluefin.io/bluefin-live-nvidia-open-gts-amd64.iso)
- Bluefin GDX (Beta) : [bluefin-gdx-lts.iso](https://download.projectbluefin.io/bluefin-gdx-lts.iso)

### ARM (aarch64)

- Bluefin LTS (Beta): [bluefin-lts-arm64.iso](https://download.projectbluefin.io/bluefin-lts-arm64.iso)
- Bluefin GDX (Beta): [bluefin-gdx-lts-arm64.iso](https://download.projectbluefin.io/bluefin-gdx-lts-arm64.iso)

### Torrents

Torrents are graciously provided by fosstorrents.com:

#### [fosstorrents.com/distributions/project-bluefin/](https://fosstorrents.com/distributions/project-bluefin/)

### Older Backup ISOs

These are the older Anaconda-based installers with an older version of Bluefin, but don't worry it will autoupdate. Try this if nothing else works:

- Bluefin (AMD/Intel): [bluefin-stable.iso](https://projectbluefin.dev/bluefin-stable.iso) - [Checksum](https://projectbluefin.dev/bluefin-stable.iso-CHECKSUM)
- Bluefin (for Nvidia):  [bluefin-stable-nvidia.iso](https://projectbluefin.dev/bluefin-nvidia-stable.iso) - [Checksum](https://projectbluefin.dev/bluefin-nvidia-stable.iso-CHECKSUM)


## Day 0: Planning

Most pain points can be addressed directly by planning ahead of time. Note that the term "Day" is an abstract, please do not install Bluefin over the course of three days. Typically an installation should take about twenty minutes.

### All Users

- Is your hardware Linux friendly?
  - Do you understand the limitations of having an Nvidia GPU? (If applicable?)
    - Nvidia Optimus laptops tend to be particularly troublesome 
  - Does the hardware require an out of tree kernel module? This may lead to long term maintenance issues
  - Does the software you use require an out of tree kernel module?
    - VirtualBox and VMWare are not supported
    - Nvidia, Xbox One Controller Support, wl drivers, and v4l2loopback are supported. (These are "best effort", in certain cases we cannot control third party software that breaks with newer versions of the Linux kernel)
    - [openzfs](https://github.com/openzfs/zfs) is included out of the box. It is used by maintainers regularly and has not yet fallen behind the kernels Bluefin ships. However, we still cannot guarantee this as it is an out of tree kernel module
  - Is your wireless card supported by Linux?
    - Poorly supported cards include Broadcom
    - Check [USB-Wifi](https://github.com/morrownr/USB-WiFi) if you are not sure
  - Is your printer/scanner well supported in Linux?
    - [Driverless printers](https://openprinting.github.io/printers/) are strongly recommended, we cannot guarantee every printer will work
    - [Scanner support](http://www.sane-project.org/sane-mfgs.html)
- Is the BIOS/UEFI up to date on the device?
    - We recommend having all hardware firmware updates completed and up to date before installation
- Are the applications you depend on well supported on Flathub?
- Does your VPN provider provide a wireguard configuration to import into Network Manager?
- Dedicated disk ready to go?
  - Bluefin does not support dual booting from the same disk
  - Bluefin does not support rebasing from a pre-existing installation of Fedora
- Remember that this is a custom Fedora based image, it does move at a brisk pace compared to something like Ubuntu LTS
- Read this documentation in its entirety, here's some associated upstream documentation:
  - [Homebrew](https://docs.brew.sh/)
  - [Flathub](https://docs.flathub.org/)
  - [bootc](https://bootc-dev.github.io/bootc/)
    - [rpm-ostree](https://coreos.github.io/rpm-ostree/) - this tool is deprecated in Bluefin but still available on the image, it will be removed in Spring 2025

### Developers

- Do you know [how to use containers](https://docker-curriculum.com/#introduction) for development?
- Do you know how to manage [systemd service units](https://systemd.io/) for both the system and user accounts?

## Day 1: Deployment and Configuration

### Deployment

- Download the right ISO from [the website](https://projectbluefin.io/#scene-picker)
- Install the operating system
  - Use the entire disk with automatic partitioning
  - (Optional): [Set up Secure Boot](/introduction.md#secure-boot)
  - (Optional): `ujust rebase-helper` to move to `:stable` or `:latest`
- Set up, test, and **verify backups** - While the system image is reproducible data, your user data in your home folder still needs to be backed up. Bluefin ships with two backup utilities depending on your preference. They are installed as Flatpaks so you can remove the one you don't use. `rclone` and `restic` are also preinstalled if you prefer command line tools
  - [Deja Dup](https://apps.gnome.org/DejaDup/)
  - [Pika Backup](https://apps.gnome.org/PikaBackup/)
  - Ensure your backups are functional _before_ moving on to configuration

### Configuration

The rest of these steps are user specific configuration and something that we tend to leave up to you. Automating this step is a good place to use tools like [chezmoi](https://www.chezmoi.io/) for dotfile configuration and syncing: `brew install chezmoi`

Since the user space is all in your home directory, just about any tool you use to automate this step should work as you expect. Ideally, configuration that you might have done at the system level in the past is configured at your user level now, leading to a clean seperation between user configuration and the system image.

- Software Installation
  - Use GNOME Software to install Flatpaks
    - (Optional): Use Flatseal to manage Flatpak permissions if appropriate
  - (Optional): Install Command line applications via `brew`
- Post-installation Configuration
  - Select/Change default applications as you see fit
  - (Optional) Import your [wireguard configuration via `wg-quick`](https://blogs.gnome.org/thaller/2019/03/15/wireguard-in-networkmanager/) or use the VPN configuration in the network manager GUI
- (Optional) Developer Configuration
  - `ujust devmode` and follow the directions
  - Start VSCode and configure your settings and extensions

## Day 2: Operations and Maintenance

Bluefin strives to make maintenance as easy as possible, however many of the automated tasks can be run manually.

- Run a System Upgrade via the menu option or `ujust update` to observe an update and reboot
  - `ujust changelogs` will show incoming changes and updates coming from Fedora
  - `ujust bios` will reboot the machine and enter the BIOS/UEFI menu. This is useful for booting into a Windows drive
- Subscribe to the [announcements tag](https://universal-blue.discourse.group/tag/announcements) on the Universal Blue forums
- Subscribe to the [release notes](https://github.com/ublue-os/bluefin/releases)
- Understand [rebase and rollback procedures](/administration.md#switching-between-streams)
- Use the [Warehouse application](https://github.com/flattool/warehouse) to manage Flatpak lifecycle:
  - Pin to an old version or rollback
  - Easily remove applications at once
- `ujust clean-system` to clean up old containers and unused flatpak runtimes

And one more piece of advice: The more you invest into day 0, the smoother your day 1 will be, which results in an even smoother day 2. After that, it's all bragging rights. The `fastfetch` command will be there to remind you of your milestone:

![image](https://github.com/user-attachments/assets/e1b77128-6aaf-4a95-a9fc-cb1409a176fc)

## Secure Boot

Secure Boot is supported by default providing an additional layer of security.

Universal Blue supports secure boot with [our custom key](https://github.com/ublue-os/akmods/raw/main/certs/public_key.der)

After the first installation, you will be prompted to enroll the secure boot key in the mokutil UEFI menu UI (_QWERTY_ keyboard input and navigation).

Then, select "Enroll MOK", and input "`universalblue`" as the password

If this step is not completed during the initial setup, you can manually enroll the key by running the following command in the terminal:

```sh
ujust enroll-secure-boot-key
```

If you'd like to enroll this key prior to installation or rebase, download the key and run the following:

```sh
sudo mokutil --timeout -1
sudo mokutil --import path/to/public_key.der
```

You can use `mokutil --list-enrolled` to confirm that the "ublue kernel" key is listed:

![image](https://github.com/user-attachments/assets/259a9bb2-2198-4744-924d-df457e26c7f4)

:::note
If you see `ublue akmods\` listed, it is a former key that is soon to be removed. `ublue kernel` is the current key.
:::
