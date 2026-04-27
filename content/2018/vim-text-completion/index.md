---
title: 'Vim Text Completion'
date: '2018-02-21'
slug: vim-text-completion
excerpt: 'I’ve been looking for a good autocomplete plugin for Vim for a while. It seems like the most popular option by far is YouCompleteMe (which I have been using for a while now). While I think YouCompleteMe is a good plugin, I also feel like it’s a bit heavy and seems to need a lot to setup and maintain. I always seem to have issues with the server going down.'
tags: ['vim']
---

I’ve been looking for a good autocomplete plugin for Vim for a while. It seems like the most popular option by far is YouCompleteMe (which I have been using for a while now). While I think YouCompleteMe is a good plugin, I also feel like it’s a bit heavy and seems to need a lot to setup and maintain. I always seem to have issues with the server going down.

Basically, I just wanted a lighter option.

Today I learned that Vim actually has a text completion feature built right in! It may not be as robust as YCM but between Emmet and the native text completion in Vim, I’m pretty satisfied across the board.

### Basic Commands

- `ctrl + p`, `ctrl + n`: previous/next matching word (what I use the majority of the time)
- `ctrl + x + l`: whole line completion
- `ctrl + x + o`: syntax-aware dictionary completion
- `ctrl + y`: choose highlighted/selected option (when navigating with arrow keys – see below)
- `ctrl + e`: exit

### Usage

When triggering the featue with one of the aforementioned commands, a menu pops up showing all the potential matches. Within this menu you can continue to hold down the `ctrl` key and navigate to the previous or next word with the `p` or `n` keys, respectively.

Alternatively, you can navigate using the up or down arrow keys. Note that when using the arrow keys, it will highlight the word from the menu but it won’t replace your text with the selected word, the way it does when you use `ctrl + p` and `ctrl + n`.

To select the highlighted word you want to use, press `ctrl + y` (*you can also press the forward arrow key or spacebar and continue typing*). To exit without selecting any of the presented options, press `ctrl + e`.

**Credits &amp; Resources**

- https://robots.thoughtbot.com/vim-you-complete-me
- http://vim.wikia.com/wiki/Any\_word\_completion
- http://vim.wikia.com/wiki/Line/word/file/whatever\_completion