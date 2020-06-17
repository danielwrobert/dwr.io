---
title: 'Adding Spaces To Your OS X Dock'
date: '2012-11-26'
slug: adding-spaces-to-your-osx-dock
excerpt: 'Adding spaces in your Dock on OS X is a nice feature that allows you to bring a little bit of visual organization to your icons. It is really easy to accomplish in just a couple short steps. First, you will want to locate your Terminal application.'
tag: ['tips &amp; tricks', 'workflow']
---

Adding spaces in your Dock on OS X is a nice feature that allows you to bring a little bit of visual organization to your icons. It is really easy to accomplish in just a couple short steps. First, you will want to locate your Terminal application. Terminal can be found at `Applications > Utilities > Terminal`. Or, for a little shortcut, you can hit `Command + Space` on your keyboard. This will being up Spotlight and you can then type in Terminal (or the name of any other application you wish to find) and it will show it up in a list below the search input.

With a Terminal shell open, copy the command below, paste it in and hit `return`:

```bash
defaults write com.apple.dock persistent-apps -array-add '{tile-data={}; tile-type="spacer-tile";}'

```

Next you will want to reset your Dock. To do this, again, copy and paste the following command to your shell and hit `return`:

```bash
killall Dock

```

And that’s all there is to it! Now you will see a blank space in on your Dock. You can move this space around, just like any other app icon. You can also repeat the above process as many times as you please, to create more spaces.

### References / Resources

- [Quick Tip: Trick Out Your Mac with Terminal](http://mac.tutsplus.com/tutorials/terminal/quick-tip-trick-out-your-mac-with-terminal/ "MacTuts Plus") on MacTuts+