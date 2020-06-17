---
title: 'Moving Local Files with Rsync'
date: '2014-06-01'
slug: moving-local-files-with-rsync
excerpt: 'I am very obsessive about backing up my data. To preserve space on my MacBook Air’s drive, I store most of media files on a WD Passport external drive. Additionally I back that media up on a second (and oftentimes a third) desktop external drive. Sure, this is a little OCD but it’d be quite a shame to lose all of my files, should my first Passport drive fail me.'
tag: ['unix', 'workflow']
---

I am very obsessive about backing up my data. To preserve space on my MacBook Air’s drive, I store most of media files on a WD Passport external drive. Additionally I back that media up on a second (and oftentimes a third) desktop external drive. Sure, this is a little OCD but it’d be quite a shame to lose all of my files, should my first Passport drive fail me.

It can, however, be a pain keeping everything updated between the two (or more) drives if you are not consistent in copying over new files to each drive every time. It’s pretty easy for things to get out of sync rather quickly. Well say hello to `rsync`! To quote [Wikipedia](http://en.wikipedia.org/wiki/Rsync "Wikipedia - Rsync"): “`rsync` is a utility software and network protocol for Unix-like systems (with a port to Microsoft Windows) that synchronizes files and directories from one location to another while minimizing data transfer by using delta encoding when appropriate. It also has the option to provide encrypted transfer by use of SSH. SSL encrypted transfer can be done via Stunnel wrapping.” I’ve used this program in the past as a deployment method from the production branch on many of my projects. One day it dawned on me that it would be an extremely useful method for keeping local drives in sync as well. This way, I wouldn’t have to worry about comparing what was last added between the two (or more) drives. Instead, I can just run the below `rsync` command and let the program handle those comparisons for me:

```bash
rsync -av /source-directory /target-directory

```

Now there is an exact copy on the target directory of what is on the source directory. If you wish to keep an exact mirror between your two directories and you later delete files on your source directory, you will need to pass the `--delete` parameter when re-syncing in order to remove those same files on the target directory:

```bash
rsync -av --delete /source-directory /target-directory

```

The `rsync` program has quite a few handy options/parameters and I would encourage you to check out the [rsync manual](http://ss64.com/bash/rsync.html "Rsync Manual") to determine what might best suit what you are trying to achieve.

### References / Resources

- [Rsync Reference](http://ss64.com/osx/rsync.html "Rsync Reference")
- [How to backup your data to an external usb hard drive with rsync](http://jordilin.wordpress.com/2006/07/29/howto-backup-your-data-to-an-external-usb-hard-drive-with-rsync/ "How to backup your data to an external usb hard drive with rsync")