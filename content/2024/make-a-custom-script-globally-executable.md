---
title: 'Make A Custom Script Globally Executable'
date: '2024-12-18'
slug: make-a-custom-script-globally-executable
excerpt: "When you write a script to automate a task, it's ideal to call it from anywhere on your filesystem rather than navigating to its directory each time..."
category: 'Bash'
tags: ['macos', 'productivity', 'unix', 'workflow']
---

Occasionally, I will put together script to automate some of my work tasks. More often than not, it's ideal to be able to call that script from anywhere on my filesystem, as opposed to constantly navigating to its directory or typing out its full path to run it.

Luckily, this is pretty straightforward to set up and can be done in just a few quick steps!

1\. Add the script to a directory that is available in your `$PATH` _or_ add the directory with the script to the `$PATH`.

```bash
# My custom script (in ~/bin)
export PATH="$HOME/bin:$PATH"
```

2\. You also need to make sure the script is executable.

```bash
# My custom script (in ~/bin)
chmod +x ~/bin/custom_script
```

3\. Lastly, add an alias if you want to have a shorter command to call for execution. For example, I have the following example set in my `.oh-my-zsh/custom/aliases.zsh` file so I can call `wp-init` when I want to run my script to spin up a new local WordPress environment:

```bash
# WP-Init Script
alias wp-init='~/bin/wp-init.sh'
```

With this alias and the above settings in place, I can now run the above alias with `wp-init` from anywhere on my filesystem!
