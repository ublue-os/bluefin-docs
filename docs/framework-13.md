---
title: Framework 13
author: Matt Hartley
slug: /framework-13
---

1. Start by downloading the Framework Laptop image of [Project Bluefin](https://projectbluefin.io/). Make sure you select Intel or AMD depending on the mainboard in your device:

> **Note:** Visit [projectbluefin.io](https://projectbluefin.io/) to download the appropriate Framework image for your Intel or AMD mainboard.

2. **Create a USB stick** using [Fedora Media Writer](https://docs.fedoraproject.org/en-US/fedora/latest/preparing-boot-media/#_on_windows) ([Windows](https://fedoraproject.org/fmw/FedoraMediaWriter-win32-latest.exe) or [Mac](https://fedoraproject.org/fmw/FedoraMediaWriter-osx-latest.dmg) or [Linux](https://flathub.org/apps/org.fedoraproject.MediaWriter))

- Insert your USB drive (8GB or larger). Note that it will be reformatted, so make sure you are ok with erasing any data that is on it.
- After installing Fedora Media Writer, run it. Choose Select .iso file, browse to bluefin-gts.iso and select it.
- Click the Write button.
- Once the USB drive creation is complete, you can click Finish, close Fedora Media Writer, eject your USB drive.

3. **Booting to the Bluefin USB**

- Insert the USB drive into your powered off Framework Laptop 13, and then power on. If you have an existing OS installed on the Storage drive in your laptop, immediately after the power light comes on begin rapidly tapping (continuously ) the F12 key - you must begin tapping well before you see the Framework logo.
- Select Linpus lite (General UDisk) with your arrow keys. Enter key.
- Next select Install Bluefin. Hit the enter key.
- Select the keyboard language you'd like to use. On the next screen, click on the Installation Destination button to choose the disk.
- If there is an OS already installed on the target drive, you'll need to follow the guided steps to delete the existing partitions.
- Click Finish Installation and then reboot into your new Bluefin install!

## Installation Steps Screenshots

The installation process follows these key stages:

1. **Boot Menu**: Select "Linpus lite (General UDisk)" from the boot options
2. **Installation Welcome**: Choose "Install Bluefin" from the welcome screen
3. **Language Selection**: Select your preferred keyboard language
4. **Installation Destination**: Choose the target disk for installation
5. **Disk Partitioning**: Configure partitions (delete existing if needed)
6. **Installation Progress**: Wait for the installation to complete
7. **Final Setup**: Complete the initial user setup
8. **First Boot**: Reboot into your new Bluefin system

> **Note:** For detailed visual guidance, refer to the [Framework laptop installation documentation](https://frame.work/linux) or the [Fedora installation guide](https://docs.fedoraproject.org/en-US/fedora/latest/install-guide/).
