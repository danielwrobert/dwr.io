---
title: 'Secure Copy Syntax Examples'
date: '2012-09-17'
slug: secure-copy-syntax-examples
excerpt: 'Secure Copy (SCP) is a means of securely transferring files between hosts on a network. It is based on the Secure Shell (SSH) protocol. The command line scp program, which is provided in most SSH implementations, is the secure analog of the rcp command.'
tag: ['unix', 'workflow']
---

Secure Copy (SCP) is a means of securely transferring files between hosts on a network. It is based on the Secure Shell (SSH) protocol. The command line `scp` program, which is provided in most SSH implementations, is the secure analog of the rcp command.

The syntax for `scp` is typically similar to that of the `cp` command.

### Examples

Copying from a remote host to your local host:

```bash
# Copy a file
scp username@remotehost.com:sourcefile.txt /path/to/local/targetfile

# Copy a directory
scp -r username@remotehost.com:sourcefolder /path/to/local/targetfolder
```

Copying from your local host to a remote host:

```bash
# Copy a file
scp sourcefile.txt username@remotehost.com:/path/to/remote/targetfile

# Copy a directory
scp -r sourcefolder username@remotehost.com:/path/to/remote/targetfolder
```

SSH runs over port 22 by default. If your remote host uses a port other than that default, you can specify the port using the `-P` flag:

```bash
# Copy a file from your local host to a remote host using port 2222
scp -P 2222 sourcefile.txt username@remotehost.com:/path/to/remote/targetfile
```

### References / Resources

- [Wikipedia – Secure Copy](http://en.wikipedia.org/wiki/Secure_copy "Wikipedia - Secure Copy")
- [Example syntax for Secure Copy (scp)](http://www.hypexr.org/linux_scp_help.php "Example syntax for Secure Copy (scp)")