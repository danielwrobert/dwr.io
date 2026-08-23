---
title: 'Neovim / LazyVim Cheatsheet'
date: '2026-08-05'
slug: neovim-cheatsheet
excerpt: 'My notes on getting back up to speed with Neovim and LazyVim after years on stock Vim, covering the changes and additions that actually come up day to day...'
category: 'Dev Tools'
tags: ['vim', 'neovim', 'cheatsheets']
---

I've been a long-time Vim user, but it was only in the past couple of years that I was introduced to Neovim. I was impressed by it overall, but I really missed the comfort of all the settings and muscle memory I had built up with my standard Vim setup, so it never quite stuck.

As part of my current workflow, I decided to give Neovim another shot and actually give it the time it deserves, using [LazyVim](https://www.lazyvim.org/) as my starting config. I had Claude help me pull together the keymaps below into something I could actually reference, then trimmed it down to what I've genuinely reached for since.

This assumes you already know Vim. Core motions, operators, text objects, registers, and Ex commands all work exactly the way they always have. Everything below is what LazyVim changes or adds on top of that. Leader key is `<Space>`, and `<C-x>` means Ctrl, not Command (Command doesn't work in a terminal at all, so if you're coming from a GUI editor, `Cmd+P` and friends need a new home).

One version note before diving in: LazyVim moves fast, so depending on when your config was scaffolded you may have `telescope.nvim` or the newer `snacks.picker`, and `neo-tree` or `snacks.explorer`. The keymaps below are nearly identical either way. If a binding doesn't do what I say it should, `<leader>sk` (search keymaps) will tell you what your version actually has it mapped to.

## Discoverability

Before memorizing anything else, it's worth internalizing this: you don't need to memorize this document. You need to memorize these four things and let the editor teach you the rest.

| Key                  | Action                                                                    |
| --------------------- | ---------------------------------------------------------------------------- |
| `<leader>` then wait    | which-key pops up and shows every binding under that prefix                  |
| `<leader>sk`            | Search **all** keymaps in a fuzzy picker, the real source of truth           |
| `<leader>sh`            | Search help tags                                                             |
| `<leader>sc`            | Search commands                                                              |

The prefixes are consistent enough that they're worth learning on their own: `f` is find/file, `s` is search, `c` is code, `g` is git, `b` is buffer, `w` is window, `x` is diagnostics, `u` is UI toggles. Learn the prefix, lean on which-key for the second key, and that's most of the system.

## What's different from stock Vim

These are the main items that differ from what I'm used to, coming straight from stock Vim (and they're the ones that have taken me some getting used to).

| Key                        | Behavior                                                   | Difference from Vim                                                          |
| --------------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `j` / `k`                     | Move by **display line** when no count given                    | Vim moves by logical line. With a count (`5j`) it reverts to logical lines      |
| `<Esc>`                        | Also clears search highlight                                    | Vim leaves `hlsearch` on                                                       |
| `<C-s>`                        | Save file (works in insert mode too)                             | Not bound in Vim                                                               |
| `<C-h/j/k/l>`                | Move between windows                                             | Vim needs `<C-w>h` etc. (`<C-w>` prefix still works)                           |
| `<A-j>` / `<A-k>`              | Move current line (or visual selection) up/down                  | Not bound in Vim                                                               |
| `<S-h>` / `<S-l>`              | Previous / next **buffer**                                       | Vim uses these for top/bottom of screen. Reach for `gg`/`G` instead            |
| `n` / `N`                      | Search next/prev, always centered and direction-consistent       | Vim doesn't recenter                                                           |
| `<` / `>` in visual          | Indent and **stay in visual mode**                                | Vim drops out of visual mode                                                   |
| `gco` / `gcO`                  | Add commented line below / above and enter insert                | Not in Vim                                                                     |
| `<C-/>` or `<C-_>`            | Toggle terminal                                                  | Not in Vim                                                                     |

Everything else you already know is untouched: all operators, text objects, motions, marks, macros, registers, `.` repeat, and the jumplist all work exactly like stock Vim.

## Keys I frequently reach for

| Key                    | Action                                    |
| ------------------------- | -------------------------------------------- |
| `<leader><space>`           | Find files in project root                    |
| `<leader>/`                 | Grep the project (live grep)                  |
| `<leader>,`                 | Switch buffers                                |
| `<leader>e`                 | Toggle file explorer                          |
| `<leader>gg`                | LazyGit                                       |

LazyVim detects a "root" per buffer (LSP workspace, then `.git`, then cwd), which is why `<leader><space>` usually finds what you want even in a monorepo. Inside any picker, `<CR>` opens, `<C-v>`/`<C-s>` opens in a split, and `<Tab>` toggles multi-select.

For git specifically, LazyGit (`<leader>gg`) covers most of what I need, but a few in-buffer gitsigns keys are worth knowing too:

| Key             | Action                       |
| ------------------ | --------------------------------- |
| `]h` / `[h`           | Next / previous hunk               |
| `<leader>ghs`         | Stage hunk (works on a visual selection too) |
| `<leader>ghp`         | Preview hunk inline                |

## LSP: navigation and code actions

This is the part that replaces most of what I used VS Code for. `<leader>cl` shows LSP info for the current buffer if something here isn't working.

| Key              | Action                                                          |
| ------------------- | -------------------------------------------------------------------- |
| `gd`                  | Go to **definition**                                                  |
| `gr`                  | Go to **references** (picker)                                        |
| `K`                   | Hover documentation (press twice to enter the float and scroll)      |
| `<leader>ca`          | Code action                                                          |
| `<leader>cr`          | Rename symbol (project-wide)                                        |
| `<leader>cf`          | Format buffer (also runs on save by default)                        |
| `]d` / `[d`           | Next / previous diagnostic                                          |
| `<leader>xx`          | Toggle Trouble (a nicer view over diagnostics)                       |
| `<C-o>`               | Jump back after `gd`, the one I still forget most often              |

If you're doing PHP or JS/TS work, `:LazyExtras` is the command that saves the most time here. Enable `lang.php`, `lang.typescript`, `lang.tailwind`, or whatever else you need, and LazyVim wires up the server, formatter, and linter for you instead of hand-configuring anything.

## flash.nvim

This is the single biggest genuinely new capability compared to stock Vim, replacing `f`/`t` hunting outright. It took me the longest to trust, but it's paid off the most now that it's muscle memory.

| Key    | Action                                                                    |
| -------- | ---------------------------------------------------------------------------- |
| `s`        | Type 1-2 characters, labels appear on every match, press the label to jump     |
| `S`        | Same idea, but labels appear on syntax nodes (Treesitter), useful for jumping to a function or block |

Both work as operator targets too, so `ds<char><label>` deletes to that point. Note that `s` in stock Vim is "substitute character" (same as `cl`), and LazyVim rebinds it, so reach for `cl` if you miss the old behavior.

## Surround, comments, and text objects

Mini.surround uses `gs` as its prefix on current LazyVim versions (`gz` on older ones):

| Key      | Action                                                              |
| ---------- | ---------------------------------------------------------------------- |
| `gsa`        | Add surround, e.g. `gsaiw"` wraps a word in quotes                       |
| `gsd`        | Delete surround, `gsd"` removes surrounding quotes                       |
| `gsr`        | Replace surround, `gsr"'` changes double to single quotes                |

Commenting: `gcc` toggles a comment on the current line, `gc` plus a motion comments that motion (`gcap` for a paragraph), and `gc` in visual mode comments the selection.

Treesitter also gives you a few text objects that hold up much better than Vim's paragraph-based guessing:

| Object      | Meaning                          |
| ------------- | ------------------------------------ |
| `af` / `if`     | A function / inside a function        |
| `ac` / `ic`     | A class / inside a class              |
| `aa` / `ia`     | An argument / inside it               |

They combine like any other text object: `daf` deletes a function, `vic` selects a class body, `cia` changes an argument.

## Troubleshooting

| Symptom                          | Check                                                                     |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| A keymap does nothing                  | `<leader>sk` and search for it, it may have moved between versions              |
| `gd` doesn't work                      | `:LspInfo`, is a server attached? `:Mason`, is it installed?                    |
| Formatting not running                 | `:ConformInfo`, is a formatter configured for this filetype?                    |
| Highlighting is wrong                  | `:TSInstallInfo`, then `:TSInstall <lang>`                                     |
| Key conflicts inside a multiplexer     | Test `<C-h>`, `<C-/>`, `<S-h>`, `<S-l>`, `<C-s>` first, these are the usual suspects |

I'm sure this list will keep growing the longer I stay in Neovim full-time, but between which-key and `<leader>sk`, I've found I don't actually need to memorize much beyond what's above. The editor is pretty good at teaching you the rest once you know to ask it.
