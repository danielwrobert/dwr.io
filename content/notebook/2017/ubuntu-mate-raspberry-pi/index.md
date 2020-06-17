---
title: 'Ubuntu MATE on Raspberry Pi'
date: '2017-03-13'
slug: ubuntu-mate-on-raspberry-pi
excerpt: 'I’ve been wanting to try out a Linux desktop for a while now. Mainly out of curiosity – I like to try new devices, operating systems, etc. I didn’t really want to invest in a computer just to *try* out a new OS, however. I had a couple older MacBooks lying around but I also had a Raspberry Pi 3 that I hadn’t quite decided what to do with.'
tag: ['raspberry pi', 'ubuntu mate']
---

I’ve been wanting to try out a Linux desktop for a while now. Mainly out of curiosity – I like to try new devices, operating systems, etc. I didn’t really want to invest in a computer just to *try* out a new OS, however. I had a couple older MacBooks lying around but I also had a Raspberry Pi 3 that I hadn’t quite decided what to do with. After poking around a bit on the internet, I found desktop variant Ubuntu MATE had been optimized for the use with the Raspberry Pi 2 &amp; 3. The installation process looked pretty straightforward and I had an extra monitor, keyboard, and mouse so I figured I’d give it a try!

Note that I decided to try this solely to test out and explore Ubuntu MATE. A single Raspberry Pi probably isn’t ideal for your main working machine, especially if you’re more of a power user or developer. It’s not super fast but I do find it great for explorational purposes.

### What you’ll need before starting

Before moving forward, you’ll need the following items:

- A [Raspberry Pi 3](https://www.amazon.com/dp/B01CD5VC92)
- A [class 6 or class 10 microSD card](https://www.amazon.com/dp/B00CES44EO/) (Make sure you get a *microSD*, not a full-size SD … initially, I made the mistake of ordering a SD card because I wasn’t paying attention)
- An external monitor
- A USB keyboard
- A USB mouse
- (optional) If you’re using a Raspberry Pi 2, you may want/need [a WiFi USB adapter](https://www.amazon.com/gp/offer-listing/B003MTTJOY/). Otherwise, you can connect via an ethernet wire. The Raspberry Pi 3 has WiFi and Bluetooth built in.

### Preparing the microSD card

Download the latest Ubuntu Mate image from <https://ubuntu-mate.org/download/>.

You will want to click and expand the LTS option and you will see the Raspberry Pi specific download option from there.

Now if you are on Linux or Mac use the `dd` tool to write the image to a microSD card.

First, verify which disk is your target microSD card. On Linux, use `lsblk` to list all bulk storage devices. If you’re on a Mac, check which disk you need with `sudo diskutil list`.

*Tip: If you are unsure which drive is your flash drive, you can type the command in your Terminal with the drive **not** inserted. Then run the command again with the drive inserted to verify which one it is. In the code examples below, you’ll need to replace (IMG\_FILE) with the path of your unzipped ubuntu mate image and (DEVICE\_PATH) with the path of your microSD card.*

Now, unmount the target volume using the following command, replacing the identifier as appropriate:

```bash
sudo umount (DEVICE_PATH)
```

Note that you’ll need the path to the disk identifier. For example, when I ran `sudo diskutil list` list, I was presented with the following:

```bash
/dev/disk0 (internal):
 #: TYPE                  NAME          SIZE       IDENTIFIER
 0: GUID_partition_scheme               1.0 TB     disk0
 1: EFI                   EFI           314.6 MB   disk0s1
 2: Apple_CoreStorage     Macintosh HD  999.6 GB   disk0s2
 3: Apple_Boot            Recovery HD   650.0 MB   disk0s3

/dev/disk1 (internal, virtual):
 #: TYPE                  NAME          SIZE       IDENTIFIER
 0:                       Macintosh HD  +999.3 GB  disk1
                          Logical Volume on disk0s2
                          0D665988-22E3-4A4A-8EC7-72DE065491F3
                          Unlocked Encrypted

/dev/disk2 (external, physical):
 #: TYPE                  NAME          SIZE       IDENTIFIER
 0: GUID_partition_scheme               *3.9 GB    disk2
 1: EFI                   EFI           209.7 MB   disk2s1
 2: Microsoft Basic Data  MyMicroSD     3.7 GB     disk2s2

```

Since I need to target the MyMicroSD drive, the command would look like the following (also note that the command is *umount*, not *unmount*, which is slightly confusing):

```bash
sudo umount /dev/disk2s2
```

If you try that and get a “Resource busy — try ‘diskutil unmount'” notice, try the following (making sure you are targeting the correct drive):

```bash
diskutil unmount /dev/disk2s2
```

With that, you’re now ready to format your drive write the image to your microSD card.

**Note: this will erase all data on the target drive replacing it with the ISO. This can not be undone, so it is critical that you target the proper identifier (see above step) to avoid unintended data loss.**

With the proper image path (IMG\_FILE) and path to your microUSD card (DEVICE\_PATH), run the following command:

**Linux/MacOS:**

```bash
$ sudo dd if=(IMG_FILE) of=(DEVICE_PATH) bs=1m
```

This process can take a while so don’t worry if nothing seems to be happening in your Terminal window. Now might be a good time to go gab a beverage and give it a little bit of time to complete. Once it finishes and you see your prompt again, you can safely eject your drive.

**Windows Users**

For Windows, there is a Windows version of *dd* available on this [site](http://www.chrysocome.net/dd).

There is also a graphical tool for Windows called *Win32 Disk Imager*, which you can download [here](https://sourceforge.net/projects/win32diskimager/). If you prefer to use the graphical tool, open the downloaded `.exe` file and, in the “image file” field, you’ll need to select the image file (unzipped). In the “device” field, you’ll need to select the Drive Letter of the microSD card.

### Installing Ubuntu MATE on your Raspberry Pi 2/3

Now at you have your microSD card ready to go, you can pop it in to your Raspberry Pi and plug your Pi into a power source (along with a monitor, keyboard, and mouse). I am using a Raspberry Pi 3 so I was able to connect to WiFi after installation. If you’re on a Pi 2, you will likely need to connect via ethernet or have an aforementioned WiFi USB adapter. Your Raspberry Pi will power right up and begin the installation process. After it boots up, you’ll be presented with options to choose your language, time-zone, and desired keyboard layout. After that, you will be prompted to create a user account, from which you can log in.

That’s all there is to it – have fun exploring Ubuntu MATE!