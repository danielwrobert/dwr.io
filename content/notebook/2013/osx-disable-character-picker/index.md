---
title: 'Disable the Character Picker in OS X'
date: '2013-07-31'
slug: disable-the-character-picker-in-os-x
excerpt: 'OS X 10.7 (Lion) introduced a feature called the Character Picker. This allows you to press-and-hold a key on your keyboard, activating a little popup with the different character options associated with that key. This can be a useful feature for some, as it allows you to visually see all of those additional character options and not have to know how to otherwise activate each of them.'
tag: ['tips &amp; tricks', 'unix', 'workflow']
---

OS X 10.7 (Lion) introduced a feature called the Character Picker. This allows you to press-and-hold a key on your keyboard, activating a little popup with the different character options associated with that key. This can be a useful feature for some, as it allows you to visually see all of those additional character options and not have to know how to otherwise activate each of them. I, however, found that it was more of a hinderance to my workflow. For example, when I am editing my code in VIM or Vintage Mode in Sublime Text, this feature prevents me from holding down the movement keys (h, j, k, l) to navigate. So I decided to disable it.

To do this, open up your Terminal (Applications &gt; Utilities &gt; Terminal) and enter the following command:

```bash
defaults write -g ApplePressAndHoldEnabled -bool false
```

Now, in order for your changes to kick in, you will have to restart your computer. And that’s all there is to it – once your computer reboots, no more Character Picker popup!