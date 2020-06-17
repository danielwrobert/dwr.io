---
title: 'Super Fast Find and Replace with Sed'
date: '2012-08-27'
slug: super-fast-find-and-replace-with-sed
excerpt: 'Sed is a UNIX stream editor that can be used to filter text files. This can be extremely useful if you have to run a Find and Replace on a string of text across a large file. I find this to be much more efficient than using a Find and Replace feature in a text editor.'
tag: ['unix', 'workflow']
---

`Sed` is a UNIX stream editor that can be used to filter text files. This can be extremely useful if you have to run a Find and Replace on a string of text across a large file. I find this to be much more efficient than using a Find and Replace feature in a text editor. It is much faster (especially on very large files) and you can let it run in a separate Terminal tab without holding up your workflow.

So how does it work? It’s pretty straightforward. You need to know the location of the file you wish to edit relative to your current directory. You will also need to know the string you are looking to update. The syntax looks something like the following:

```bash
sed -i ".backup" 's/string-to-find/string-to-replace/g' path/to/file

```

See, not too bad! The `-i` flag accepts an optional parameter, which tells `sed` to make a duplicate of the target file and append that parameter as an extension to the backup file. Then, `sed` will run the search and replace on the target file. In the syntax shown above, the `-i` flag is being passed a parameter of `".backup"`. If the target file is `database.sql`, `sed` will first make a copy named `database.sql.backup` and then run the string replacement on the original file. If you do not wish to make a backup copy you can simply leave a space after the `-i` flag. However, if you are on OS X you must include an empty set of quotes after the `-i` flag. For example:

```bash
sed -i "" 's/string-to-find/string-to-replace/g' path/to/file

```

On a Linux OS, however, the quotes are not needed.

```bash
sed -i 's/string-to-find/string-to-replace/g' path/to/file

```

And that’s really all there is to it. If you need to do a Find and Replace across a large file but do not want to hold up your workflow in a text editor, you may want to consider popping open a Terminal window and let `sed` do its magic. I find this process to be much more efficient.

### Bonus Tip

For those of you who are not comfortable using the Terminal, you can actually configure shell scripts in TextExpander (a productivity app for OS X). Nettuts+ has [a great article](http://net.tutsplus.com/articles/general/textexpander-for-web-developers/ "TextExpander for Web Developers") on the various usages of the app so I won’t go into all of that here. In short, you can select the Shell Script content type from the dropdown menu, assign your snippet an abbreviation and input the following script in the content area:

```bash
#! /bin/bash
sed -i "%filltext:name=backup:default=.backup%" 's/%filltext:name=find%/%filltext:name=replace%/g' %filltext:name=file path%
```

The first line is standard for shell scripts and points to Bash. The next line is the command written in the syntax for `sed`, as explained earlier. What you see in between the %% symbols represent the TextExpander logic, which sets parameters for the snippet expansion with optional defaults. Once you’ve set up your snippet will be able to try it out from anywhere on your Desktop (even outside of a text editor). Type “findrep” (or whatever abbreviation you assigned to your snippet) along with the delimiter that you specified (if any). Then, a dialog will popup with a default of `".backup"` as a parameter to the `-i` flag. Once you fill in the remaining parameters, press OK, then the Find and Replace script will run!

### References / Resources

- I would like to thank [Derek Payton](http://dmpayton.com "Derek Payton") for showing me this superb UNIX magic as I was struggling through an update to a large .sql file. It could have taken me 3 calendar years to complete the task in a text editor on a file that size.
- [TextExpander](http://smilesoftware.com/TextExpander/ "TextExpander") – $34.99