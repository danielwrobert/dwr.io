---
title: 'Neovim / LazyVim Cheatsheet'
date: '2026-08-05'
slug: neovim-cheatsheet
excerpt: 'A practical workflow for using AI to quickly get caught up on long GitHub Discussions, Issues, and Pull Request threads...'
category: 'Dev Tools'
tags: ['vim', 'neovim', 'cheatsheets']
---

I've been a long-time Vim user, but only in the past couple years was I introduced to Neovim. I was really impressed by it overall, but I really ended up missing the comfort of all the settings and everything that I had in place with my standard Vim setup.

As a part of my more current workflow, I thought I'd give Neovim another shot and give it a little bit more time to get used to it. To help me out, I worked with Claude to put together a cheat sheet with a bunch of shortcuts and commands that I'd likely reach for on a day-to-day basis.

Note this is meant to serve as a reference for someone who already knows Vim. Core Vim motions, operators, text objects, registers, and Ex commands all work the same as they do in Vim. This document focuses on **what LazyVim adds or changes on top of stock Vim**, plus the Neovim-specific pieces that don't exist in Vim 8.

**Leader key is `<Space>`. Local leader is `\`.** See [Notation](#notation-leaders-and-modifiers) for how key combinations are written throughout.

> **Version note:** LazyVim moves fast. Two things have shifted recently and you may see either set depending on when your config was scaffolded:
>
> - **Picker:** older setups use `telescope.nvim`, newer ones use `snacks.picker`. The keymaps below are nearly identical either way.
> - **File explorer:** older setups use `neo-tree`, newer ones use `snacks.explorer`. Same `<leader>e` binding.
> - **Surround:** the `mini.surround` prefix changed from `gz` to `gs`. If `gsa` does nothing, try `gza`.
>
> The authoritative answer for _your_ install is always `<leader>sk` (search keymaps) — see [Discoverability](#discoverability-the-most-important-section).

---

## Table of Contents

1. [Notation: leaders and modifiers](#notation-leaders-and-modifiers)
2. [Discoverability](#discoverability-the-most-important-section)
3. [LazyVim's changes to core Vim behavior](#lazyvims-changes-to-core-vim-behavior)
4. [Files, buffers, and pickers](#files-buffers-and-pickers)
5. [Search](#search)
6. [File explorer](#file-explorer)
7. [Windows, splits, and tabs](#windows-splits-and-tabs)
8. [LSP: navigation and code actions](#lsp-navigation-and-code-actions)
9. [Diagnostics and Trouble](#diagnostics-and-trouble)
10. [Completion and snippets](#completion-and-snippets)
11. [Git](#git)
12. [Terminal](#terminal)
13. [Motion: flash.nvim](#motion-flashnvim)
14. [Surround, comments, and text objects](#surround-comments-and-text-objects)
15. [Toggles](#toggles)
16. [Sessions and project management](#sessions-and-project-management)
17. [Plugin and tooling management](#plugin-and-tooling-management)
18. [Debugging and testing](#debugging-and-testing)
19. [Neovim features Vim doesn't have](#neovim-features-vim-doesnt-have)
20. [Web dev specifics](#web-dev-specifics)
21. [Config layout](#config-layout)
22. [Troubleshooting](#troubleshooting)
23. [Getting back up to speed](#getting-back-up-to-speed)

---

## Notation: leaders and modifiers

### Modifiers

| Notation           | Key                                        |
| ------------------ | ------------------------------------------ |
| `<C-x>`            | **Ctrl** — _not_ Command                   |
| `<S-x>`            | **Shift**                                  |
| `<A-x>` or `<M-x>` | **Alt** / Meta (Option on macOS)           |
| `<D-x>`            | **Command** / Super — **GUI clients only** |
| `<leader>`         | Leader key (Space)                         |
| `<localleader>`    | Local leader (`\`)                         |

Other special keys you'll see: `<CR>` (Enter), `<Esc>`, `<Tab>`, `<BS>` (Backspace), `<Space>`, `<Up/Down/Left/Right>`, `<F1>`–`<F12>`, `<C-_>` (see below).

Combinations stack: `<C-S-p>` is Ctrl+Shift+P. A sequence without brackets is pressed in order — `<leader>ff` means Space, then f, then f.

**`<D-` (Command) does not work in a terminal.** Terminals cannot transmit the Command key, so it's only available in GUI clients like Neovide, VimR, and goneovim. Running inside a terminal multiplexer, treat Command as nonexistent — every `Cmd+P` / `Cmd+Shift+F` / `Cmd+S` reflex needs a new home (`<leader><space>`, `<leader>/`, `<C-s>`).

**`<S-` with letters is redundant.** Shift+letter _is_ the uppercase letter, so `<S-h>` and `H` are the same mapping — LazyVim writes it verbosely for symmetry with `<S-l>`. Shift notation is only strictly necessary for non-letter keys: `<S-Tab>`, `<S-CR>`, `<S-F5>`, `<S-Insert>`.

**Terminal modifier limits.** Standard terminals collapse many Ctrl and Ctrl+Shift combinations into identical byte sequences, which is why almost no config binds `<C-S-x>`. If you want full modifier fidelity, use a terminal supporting the kitty keyboard protocol — Kitty, WezTerm, Ghostty, or recent Alacritty.

Two specific casualties worth knowing:

- **`<C-/>`** is sent as `<C-_>` by many terminals. That's why the terminal toggle is listed as both.
- **`<C-s>`** is historically the XOFF flow-control signal and may freeze your terminal until you press `<C-q>`. Fix by adding `stty -ixon` to your shell rc.

### Leader vs. local leader

`<leader>` is for **global** mappings, active in every buffer. `<localleader>` is for **buffer-local, filetype-specific** mappings — the convention exists so a LaTeX or Org plugin can claim a dozen keys without colliding with your global namespace.

LazyVim core defines essentially **zero** `<localleader>` mappings. It sets the variable so plugins expecting it behave correctly. You'll only encounter it via plugins like vimtex, quarto, neorg, molten, or iron.nvim. For PHP/JS work you may never press it.

Note that stock Vim and Neovim default _both_ leaders to `\`. LazyVim moves leader to Space and leaves localleader at the vanilla default — so if you never set `mapleader` in your `.vimrc`, your old Vim leader is now your local leader.

**Checking your values:**

```vim
:lua print(vim.inspect(vim.g.mapleader))
:lua print(vim.inspect(vim.g.maplocalleader))
```

**Changing them — ordering is critical.** Leader is resolved at mapping-_definition_ time, not at press time. Set it after plugins load and existing mappings keep the old leader while new ones use the new value, producing a half-broken config that's genuinely hard to diagnose. In LazyVim the correct place is `lua/config/options.lua`, which loads before plugin setup:

```lua
-- lua/config/options.lua
vim.g.mapleader = " "
vim.g.maplocalleader = ","
```

(`"\\"` in Lua is an escaped backslash — a single `\` character.)

---

## Discoverability (the most important section)

Do not memorize this document. Memorize these four things and let the editor teach you the rest.

| Key                  | Action                                                                                                                        |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `<leader>` then wait | **which-key** popup shows every binding under that prefix. Works for any prefix: `<leader>g`, `<leader>c`, `g`, `z`, `]`, `[` |
| `<leader>sk`         | Search **all** keymaps in a fuzzy picker — the real source of truth                                                           |
| `<leader>sh`         | Search help tags                                                                                                              |
| `<leader>sc`         | Search commands                                                                                                               |

**Mnemonic scheme.** LazyVim's prefixes are consistent, which is what makes them learnable:

| Prefix      | Domain                              |
| ----------- | ----------------------------------- |
| `<leader>f` | **f**ind / **f**ile                 |
| `<leader>s` | **s**earch                          |
| `<leader>c` | **c**ode (LSP, formatting, actions) |
| `<leader>g` | **g**it                             |
| `<leader>b` | **b**uffer                          |
| `<leader>w` | **w**indow                          |
| `<leader>x` | diagnostics / trouble (e**x**amine) |
| `<leader>u` | **u**I toggles                      |
| `<leader>q` | **q**uit / session                  |
| `<leader>d` | **d**ebug (requires DAP extra)      |
| `<leader>t` | **t**est (requires neotest extra)   |

Learn the prefix, then use which-key for the second key. That's the whole system.

---

## LazyVim's changes to core Vim behavior

These are the ones that will feel "wrong" coming from stock Vim. Worth reading carefully.

| Key                      | Behavior                                                   | Difference from Vim                                                                                     |
| ------------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `j` / `k`                | Move by **display line** when no count given               | Vim moves by logical line. With a count (`5j`) it reverts to logical lines                              |
| `<Esc>`                  | Also clears search highlight                               | Vim leaves `hlsearch` on                                                                                |
| `<C-s>`                  | Save file (works in insert mode too)                       | Not bound in Vim                                                                                        |
| `<C-h/j/k/l>`            | Move between windows                                       | Vim needs `<C-w>h` etc. (`<C-w>` prefix still works)                                                    |
| `<C-Up/Down/Left/Right>` | Resize current window                                      | Not bound in Vim                                                                                        |
| `<A-j>` / `<A-k>`        | Move current line (or visual selection) up/down            | Not bound in Vim                                                                                        |
| `<S-h>` / `<S-l>`        | Previous / next **buffer**                                 | Vim: top/bottom of screen. Use `H`/`L`… which are now taken. Use `gg`/`G` or `zt`/`zb` mentally instead |
| `n` / `N`                | Search next/prev, always centered and direction-consistent | Vim doesn't recenter                                                                                    |
| `<` / `>` in visual      | Indent and **stay in visual mode**                         | Vim drops out of visual mode                                                                            |
| `p` in visual            | Paste without clobbering the register                      | Vim replaces the unnamed register                                                                       |
| `gco` / `gcO`            | Add commented line below / above and enter insert          | Not in Vim                                                                                              |
| `<C-/>` or `<C-_>`       | Toggle terminal                                            | Not in Vim                                                                                              |

**Things that are unchanged and worth remembering:** all operators (`d`, `c`, `y`, `>`, `=`, `gu`, `gU`, `g~`), all text objects (`iw`, `ap`, `i"`, `it`, `ab`), all motions (`f`, `t`, `%`, `{`, `}`, `(`, `)`, `[[`, `]]`), marks, macros (`q`, `@`), registers (`"a`), `.` repeat, `Ctrl-o`/`Ctrl-i` jumplist, `g;`/`g,` changelist.

---

## Files, buffers, and pickers

### Finding files

| Key               | Action                                         |
| ----------------- | ---------------------------------------------- |
| `<leader><space>` | Find files in project root (the workhorse)     |
| `<leader>ff`      | Find files in root dir                         |
| `<leader>fF`      | Find files in **cwd** (ignores root detection) |
| `<leader>fg`      | Find files tracked by git                      |
| `<leader>fr`      | Recent files                                   |
| `<leader>fR`      | Recent files (cwd)                             |
| `<leader>fc`      | Find config file (your Neovim config)          |
| `<leader>fn`      | New file                                       |

> **Root dir vs cwd:** LazyVim auto-detects a "root" per buffer using LSP workspace, then `.git`, then falls back to cwd. In a monorepo or a multi-plugin WordPress project this matters a lot. Uppercase variants (`<leader>fF`, `<leader>sW`) generally mean "use cwd instead of root."

### Buffers

| Key                             | Action                                 |
| ------------------------------- | -------------------------------------- |
| `<leader>,`                     | Switch buffer (picker)                 |
| `<leader>fb`                    | Buffer picker                          |
| `<S-h>` / `[b`                  | Previous buffer                        |
| `<S-l>` / `]b`                  | Next buffer                            |
| `<leader>bb` or `` <leader>` `` | Switch to **other** (last) buffer      |
| `<leader>bd`                    | Delete buffer, keep the window layout  |
| `<leader>bD`                    | Delete buffer **and** close the window |
| `<leader>bo`                    | Delete all **o**ther buffers           |
| `<leader>bp`                    | Toggle pin buffer                      |
| `<leader>bP`                    | Delete all non-pinned buffers          |
| `<leader>bl` / `<leader>br`     | Delete buffers to the left / right     |

### Inside a picker

| Key                                    | Action                        |
| -------------------------------------- | ----------------------------- |
| `<C-j>` / `<C-k>` or `<C-n>` / `<C-p>` | Next / previous item          |
| `<CR>`                                 | Open                          |
| `<C-v>`                                | Open in vertical split        |
| `<C-s>`                                | Open in horizontal split      |
| `<C-t>`                                | Open in new tab               |
| `<C-q>`                                | Send results to quickfix list |
| `<Tab>`                                | Toggle multi-select           |
| `<C-/>` (telescope) or `?` (snacks)    | Show picker-specific keymaps  |
| `<Esc>` twice                          | Close                         |

---

## Search

| Key          | Action                                                        |
| ------------ | ------------------------------------------------------------- |
| `<leader>/`  | **Grep the project** (live grep) — use this constantly        |
| `<leader>sg` | Grep in root dir                                              |
| `<leader>sG` | Grep in cwd                                                   |
| `<leader>sw` | Grep the word under cursor (visual mode: grep the selection)  |
| `<leader>sW` | Same, in cwd                                                  |
| `<leader>sb` | Fuzzy search within current buffer                            |
| `<leader>ss` | Search **symbols** in current document (LSP)                  |
| `<leader>sS` | Search symbols across workspace (LSP)                         |
| `<leader>sr` | Search **and replace** across project (grug-far / spectre)    |
| `<leader>sd` | Document diagnostics                                          |
| `<leader>sD` | Workspace diagnostics                                         |
| `<leader>st` | TODO / FIXME / HACK comments                                  |
| `<leader>sT` | TODO/FIX/FIXME only                                           |
| `<leader>sh` | Help pages                                                    |
| `<leader>sk` | Keymaps                                                       |
| `<leader>sc` | Command history                                               |
| `<leader>sC` | Commands                                                      |
| `<leader>s"` | Registers                                                     |
| `<leader>sm` | Marks                                                         |
| `<leader>sj` | Jumplist                                                      |
| `<leader>sq` | Quickfix list                                                 |
| `<leader>sl` | Location list                                                 |
| `<leader>sa` | Autocommands                                                  |
| `<leader>sH` | Highlight groups (useful when writing a colorscheme override) |
| `<leader>uC` | Colorscheme picker with live preview                          |
| `]t` / `[t`  | Next / previous TODO comment                                  |

**Grep syntax tip:** the live grep uses ripgrep. You can pass rg flags inline in most setups by typing your pattern, then ` -- -g '*.php'` to restrict to a glob. Check `?` inside the picker for your version.

---

## File explorer

`<leader>e` toggles the explorer at the project root. `<leader>E` opens at cwd. (In neo-tree setups, `<leader>fe` / `<leader>fE`.)

| Key             | Action (inside the tree)                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `<CR>` / `o`    | Open file or expand directory                                                                                |
| `a`             | Add file. **End the name with `/` to create a directory.** Supports `foo/bar/baz.php` to create nested paths |
| `A`             | Add directory                                                                                                |
| `d`             | Delete                                                                                                       |
| `r`             | Rename                                                                                                       |
| `c`             | Copy                                                                                                         |
| `m`             | Move                                                                                                         |
| `y` / `x` / `p` | Copy / cut / paste                                                                                           |
| `Y`             | Copy relative path to clipboard                                                                              |
| `H`             | Toggle hidden files                                                                                          |
| `S` / `s`       | Open in horizontal / vertical split                                                                          |
| `t`             | Open in new tab                                                                                              |
| `P`             | Toggle preview                                                                                               |
| `R`             | Refresh                                                                                                      |
| `.`             | Set the selected directory as root                                                                           |
| `<BS>`          | Navigate up one directory                                                                                    |
| `?`             | Show all explorer keymaps                                                                                    |
| `q`             | Close                                                                                                        |

> Neo-tree also has source tabs: `<` and `>` cycle between **filesystem**, **buffers**, and **git status** views. The git status view is a fast way to see and stage changed files.

---

## Windows, splits, and tabs

| Key                           | Action                                        |
| ----------------------------- | --------------------------------------------- |
| `<leader>-` or `<leader>w-`   | Split window **below**                        |
| `<leader>\|` or `<leader>w\|` | Split window **right**                        |
| `<leader>wd`                  | Close window                                  |
| `<leader>wm`                  | Toggle maximize current window                |
| `<C-h/j/k/l>`                 | Navigate windows                              |
| `<C-Up/Down/Left/Right>`      | Resize window                                 |
| `<leader>uZ`                  | Zen mode (single, centered, distraction-free) |
| `<leader>uz`                  | Zoom mode                                     |

Tabs (Vim tabs = window layouts, not "tabs" in the VS Code sense — your buffers are the VS Code tabs):

| Key                                 | Action              |
| ----------------------------------- | ------------------- |
| `<leader><tab><tab>`                | New tab             |
| `<leader><tab>]` / `<leader><tab>[` | Next / previous tab |
| `<leader><tab>d`                    | Close tab           |
| `<leader><tab>f`                    | First tab           |
| `<leader><tab>l`                    | Last tab            |

---

## LSP: navigation and code actions

This is the part that replaces most of what you used VS Code for. `<leader>cl` shows LSP info for the current buffer.

| Key              | Action                                                          |
| ---------------- | --------------------------------------------------------------- |
| `gd`             | Go to **definition**                                            |
| `gD`             | Go to **declaration**                                           |
| `gr`             | Go to **references** (picker)                                   |
| `gI`             | Go to **implementation**                                        |
| `gy`             | Go to **type** definition                                       |
| `K`              | Hover documentation (press twice to enter the float and scroll) |
| `gK`             | Signature help                                                  |
| `<C-k>` (insert) | Signature help                                                  |
| `<leader>ca`     | **Code action**                                                 |
| `<leader>cA`     | Source action (organize imports, etc.)                          |
| `<leader>cr`     | **Rename symbol** (project-wide)                                |
| `<leader>cR`     | Rename file (and update imports, where supported)               |
| `<leader>cf`     | Format buffer (also runs on save by default)                    |
| `<leader>cF`     | Format injected languages                                       |
| `<leader>cc`     | Run codelens                                                    |
| `<leader>cC`     | Refresh codelens                                                |
| `<leader>ci`     | LSP incoming calls                                              |
| `<leader>co`     | LSP outgoing calls                                              |
| `<leader>cs`     | Document symbols (outline)                                      |
| `<leader>cS`     | Toggle symbols outline sidebar (aerial/outline extra)           |
| `<C-o>`          | Jump **back** after `gd` — this is the one people forget        |
| `<C-i>`          | Jump forward                                                    |

**Formatting control:** `<leader>uf` toggles autoformat globally, `<leader>uF` toggles it for the current buffer only. Very useful when you open a legacy file you don't want to reformat entirely.

---

## Diagnostics and Trouble

| Key          | Action                                           |
| ------------ | ------------------------------------------------ |
| `]d` / `[d`  | Next / previous diagnostic                       |
| `]e` / `[e`  | Next / previous **error**                        |
| `]w` / `[w`  | Next / previous **warning**                      |
| `<leader>cd` | Line diagnostics (float)                         |
| `<leader>xx` | Toggle Trouble: document diagnostics             |
| `<leader>xX` | Toggle Trouble: workspace diagnostics            |
| `<leader>xL` | Location list in Trouble                         |
| `<leader>xQ` | Quickfix list in Trouble                         |
| `<leader>xt` | TODO comments in Trouble                         |
| `<leader>cs` | Symbols in Trouble                               |
| `<leader>ud` | Toggle diagnostics on/off                        |
| `[q` / `]q`  | Previous / next quickfix item (works everywhere) |

---

## Completion and snippets

LazyVim uses `blink.cmp` (newer) or `nvim-cmp` (older). Bindings are close to identical.

| Key                                    | Action                                     |
| -------------------------------------- | ------------------------------------------ |
| `<C-Space>`                            | Trigger completion                         |
| `<C-n>` / `<C-p>` or `<C-j>` / `<C-k>` | Next / previous item                       |
| `<CR>`                                 | Confirm                                    |
| `<Tab>`                                | Confirm / jump to next snippet placeholder |
| `<S-Tab>`                              | Jump to previous snippet placeholder       |
| `<C-e>`                                | Abort completion                           |
| `<C-b>` / `<C-f>`                      | Scroll the documentation window            |

Native Vim completion still works and is sometimes faster: `<C-x><C-f>` for file paths, `<C-x><C-l>` for whole lines, `<C-n>` for buffer words.

---

## Git

| Key          | Action                                                     |
| ------------ | ---------------------------------------------------------- |
| `<leader>gg` | **LazyGit** (root dir) — the main event                    |
| `<leader>gG` | LazyGit (cwd)                                              |
| `<leader>gb` | Git blame line                                             |
| `<leader>gB` | Open current line/selection in the browser (GitHub/GitLab) |
| `<leader>gf` | Git history for current file                               |
| `<leader>gl` | Git log (root)                                             |
| `<leader>gL` | Git log (cwd)                                              |
| `<leader>gs` | Git status picker                                          |
| `<leader>gd` | Git diff (hunks)                                           |
| `<leader>gS` | Git stash picker                                           |

### Gitsigns (in-buffer hunks)

| Key           | Action                                                     |
| ------------- | ---------------------------------------------------------- |
| `]h` / `[h`   | Next / previous hunk                                       |
| `]H` / `[H`   | Last / first hunk                                          |
| `<leader>ghs` | **Stage** hunk (works on a visual selection too)           |
| `<leader>ghr` | **Reset** hunk                                             |
| `<leader>ghS` | Stage entire buffer                                        |
| `<leader>ghu` | Undo stage hunk                                            |
| `<leader>ghR` | Reset buffer                                               |
| `<leader>ghp` | Preview hunk inline                                        |
| `<leader>ghb` | Blame line (full)                                          |
| `<leader>ghd` | Diff this file                                             |
| `ih`          | Text object: **i**nside **h**unk — use `dih`, `vih`, `yih` |

---

## Terminal

| Key                | Action                                           |
| ------------------ | ------------------------------------------------ |
| `<C-/>` or `<C-_>` | Toggle floating terminal at **root dir**         |
| `<leader>ft`       | Terminal at root dir                             |
| `<leader>fT`       | Terminal at cwd                                  |
| `<Esc><Esc>`       | Leave terminal insert mode (back to normal mode) |
| `<C-/>`            | Hide the terminal from inside it                 |
| `i` / `a`          | Re-enter terminal insert mode                    |

> **In a Herd session specifically:** you may want to _skip_ the built-in terminal entirely and let the multiplexer own your panes — one pane for Neovim, one for the shell, one for an agent. If you go that route, be aware `<C-/>`, `<C-h/j/k/l>`, and `<S-h>`/`<S-l>` are the bindings most likely to collide with a multiplexer prefix. Check for conflicts early; remapping the multiplexer prefix is usually easier than remapping LazyVim.

---

## Motion: flash.nvim

This is the biggest genuinely-new motion capability versus stock Vim. It replaces `f`/`t` hunting and EasyMotion.

| Key                           | Action                                                                                         |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| `s`                           | **Flash jump.** Type 1–2 characters, labels appear on every match, press the label to jump     |
| `S`                           | **Flash Treesitter.** Labels appear on syntax nodes — jump to a function, a block, an argument |
| `r` (operator-pending)        | Remote flash — e.g. `yr` then jump somewhere and yank a text object there, cursor returns      |
| `R` (operator-pending/visual) | Treesitter search                                                                              |
| `<C-s>` (in command mode)     | Toggle flash while typing a `/` search                                                         |

`s` and `S` work as operator targets: `ds<char><label>` deletes to that point. Very fast once it's muscle memory.

> Note: `s` in stock Vim is "substitute character" (= `cl`). LazyVim rebinds it. Use `cl` if you miss it.

---

## Surround, comments, and text objects

### mini.surround

**Prefix is `gs` in current LazyVim, `gz` in older versions.**

| Key           | Action                                                               |
| ------------- | -------------------------------------------------------------------- |
| `gsa`         | **Add** surround (visual mode, or `gsaiw"` to wrap a word in quotes) |
| `gsd`         | **Delete** surround — `gsd"` removes surrounding quotes              |
| `gsr`         | **Replace** surround — `gsr"'` changes double to single quotes       |
| `gsf` / `gsF` | Find surround to the right / left                                    |
| `gsh`         | Highlight surround                                                   |
| `gsn`         | Update `n` lines for surround search                                 |

For HTML/JSX/Blade, `gsat` adds a tag; `gsdt` deletes the surrounding tag.

### Comments

| Key           | Action                                                             |
| ------------- | ------------------------------------------------------------------ |
| `gcc`         | Toggle comment on current line                                     |
| `gc` + motion | Comment a motion — `gcap` comments a paragraph, `gc3j` three lines |
| `gc` (visual) | Comment selection                                                  |
| `gbc`         | Toggle **block** comment on line                                   |
| `gco`         | New commented line **below** and enter insert                      |
| `gcO`         | New commented line **above** and enter insert                      |
| `gcA`         | Append a comment at end of line and enter insert                   |

### Treesitter text objects

These make code manipulation far better than Vim's paragraph-based guessing.

| Object      | Meaning                               |
| ----------- | ------------------------------------- |
| `af` / `if` | A **function** / inside a function    |
| `ac` / `ic` | A **class** / inside a class          |
| `aa` / `ia` | An **argument/parameter** / inside it |
| `ai` / `ii` | An **indent** block / inside it       |
| `ao` / `io` | A loop / conditional block            |
| `a=` / `i=` | An assignment / inside it             |

Combine as usual: `daf` deletes a function, `vic` selects a class body, `cia` changes an argument.

| Key                       | Action                                                                    |
| ------------------------- | ------------------------------------------------------------------------- |
| `]f` / `[f`               | Next / previous function start                                            |
| `]c` / `[c`               | Next / previous class start                                               |
| `]a` / `[a`               | Next / previous argument                                                  |
| `<C-Space>` (normal mode) | Incremental selection — expand selection by syntax node. Press repeatedly |
| `<BS>` (visual)           | Shrink incremental selection                                              |

### mini.ai extras

`a`/`i` also work with:

- `aq` / `iq` — any quote
- `ab` / `ib` — any bracket
- `at` / `it` — a tag
- `an` / `in` + object — the **next** occurrence (`cin(` changes inside the next parens)
- `al` / `il` + object — the **last** occurrence

---

## Toggles

Everything under `<leader>u` toggles a UI or behavior setting. Press `<leader>u` and read the which-key menu.

| Key          | Toggles                                   |
| ------------ | ----------------------------------------- |
| `<leader>uf` | Auto-format (global)                      |
| `<leader>uF` | Auto-format (buffer)                      |
| `<leader>us` | Spelling                                  |
| `<leader>uw` | Word wrap                                 |
| `<leader>uL` | Relative line numbers                     |
| `<leader>ul` | Line numbers                              |
| `<leader>ud` | Diagnostics                               |
| `<leader>uc` | Conceal level                             |
| `<leader>uh` | Inlay hints                               |
| `<leader>ub` | Background dark/light                     |
| `<leader>uT` | Treesitter highlight                      |
| `<leader>ug` | Indent guides                             |
| `<leader>uD` | Dim inactive                              |
| `<leader>uA` | Animations                                |
| `<leader>ua` | Toggle transparency / auto-pairs (varies) |
| `<leader>ui` | Inspect highlight group under cursor      |
| `<leader>uI` | Inspect Treesitter tree                   |
| `<leader>un` | Dismiss all notifications                 |
| `<leader>up` | Toggle profiler                           |

---

## Sessions and project management

| Key          | Action                                    |
| ------------ | ----------------------------------------- |
| `<leader>qq` | Quit all                                  |
| `<leader>qs` | **Restore session** for current directory |
| `<leader>ql` | Restore **last** session                  |
| `<leader>qd` | Don't save current session on exit        |
| `<leader>fp` | Projects picker (jump between projects)   |
| `<leader>qS` | Select session                            |

Sessions restore your open buffers and window layout per directory. Combined with the projects picker, this is your equivalent of VS Code workspaces.

---

## Plugin and tooling management

| Command / Key   | Action                                                                      |
| --------------- | --------------------------------------------------------------------------- |
| `<leader>l`     | Open **Lazy** (plugin manager)                                              |
| `<leader>L`     | LazyVim changelog                                                           |
| `<leader>cm`    | Open **Mason** (LSP/formatter/linter installer)                             |
| `:LazyExtras`   | **Browse and enable LazyVim extras** — this is how you add language support |
| `:Lazy update`  | Update plugins                                                              |
| `:Lazy sync`    | Install/clean/update                                                        |
| `:Lazy profile` | Startup time breakdown                                                      |
| `:Mason`        | Same as `<leader>cm`                                                        |
| `:checkhealth`  | Diagnose your whole setup                                                   |
| `:LazyHealth`   | Health check for LazyVim specifically                                       |

Inside Lazy: `I` install, `U` update, `X` clean, `S` sync, `L` log, `?` help, `q` quit.
Inside Mason: `i` install, `X` uninstall, `U` update, `/` filter, `g?` help.

> `:LazyExtras` is the single most useful command for a returning user. Rather than hand-configuring an LSP, enable `lang.php`, `lang.typescript`, `lang.tailwind`, `lang.json`, `lang.yaml`, etc., and LazyVim wires up the server, formatter, linter, and Treesitter parser for you.

---

## Debugging and testing

Requires the `dap.core` and `test.core` extras (`:LazyExtras`).

### DAP

| Key          | Action                                        |
| ------------ | --------------------------------------------- |
| `<leader>db` | Toggle breakpoint                             |
| `<leader>dB` | Breakpoint with condition                     |
| `<leader>dc` | Continue / start                              |
| `<leader>di` | Step into                                     |
| `<leader>do` | Step out                                      |
| `<leader>dO` | Step over                                     |
| `<leader>dt` | Terminate                                     |
| `<leader>du` | Toggle DAP UI                                 |
| `<leader>dr` | Toggle REPL                                   |
| `<leader>de` | Eval expression (works on a visual selection) |

### Neotest

| Key          | Action                    |
| ------------ | ------------------------- |
| `<leader>tt` | Run tests in current file |
| `<leader>tT` | Run all test files        |
| `<leader>tr` | Run nearest test          |
| `<leader>tl` | Run last test             |
| `<leader>ts` | Toggle test summary       |
| `<leader>to` | Show test output          |
| `<leader>tO` | Toggle output panel       |
| `<leader>tS` | Stop tests                |

---

## Neovim features Vim doesn't have

Worth knowing these exist, since they're the reason the ecosystem works the way it does.

| Feature                          | Why it matters                                                                                                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Built-in LSP**                 | `gd`, `gr`, `K`, rename, code actions all come from the language server, not ctags. Configure with `nvim-lspconfig` + Mason |
| **Treesitter**                   | Real syntax trees, not regex highlighting. Powers text objects, incremental selection, folding, and accurate indentation    |
| **Lua config**                   | `init.lua` instead of `.vimrc`. Faster, and everything is a real API                                                        |
| **`vim.opt` / `vim.keymap.set`** | Lua equivalents of `:set` and `:map`                                                                                        |
| **Floating windows**             | Hover docs, LazyGit, terminals, pickers all live in floats                                                                  |
| **`:terminal`**                  | A real job-control terminal buffer                                                                                          |
| **`:checkhealth`**               | Diagnoses providers, clipboard, parsers, LSP                                                                                |
| **Virtual text**                 | Inline diagnostics, git blame, inlay hints                                                                                  |
| **Remote plugins / RPC**         | How agent integrations attach                                                                                               |
| **`vim.system` / async**         | Non-blocking jobs; why formatting on save doesn't freeze                                                                    |

Useful Ex commands: `:LspInfo`, `:LspRestart`, `:ConformInfo` (formatters), `:TSInstallInfo`, `:messages`, `:Inspect`, `:InspectTree`.

---

## Web dev specifics

Relevant to PHP/WordPress and modern JS work:

- **Enable via `:LazyExtras`:** `lang.php`, `lang.typescript`, `lang.tailwind`, `lang.json`, `lang.yaml`, `lang.markdown`, `lang.docker`, `lang.git`, `lang.sql`.
- **PHP** ships with `intelephense` (needs a license key for the premium features) or `phpactor`. Formatting via `pint` or `php-cs-fixer`; add `phpcs`/`phpcbf` through Mason if you're on WordPress Coding Standards.
- **Emmet:** `emmet-language-server` is available via Mason and works in completion — type `div.wrapper>ul>li*3` and confirm.
- **Tailwind:** the `lang.tailwind` extra gives you color swatches in completion and class sorting.
- **`ts_ls` / `vtsls`** for TypeScript, with `<leader>co` for organize imports and `<leader>cM` for missing imports.
- **Auto tag closing** and **matchup** (`%` on HTML tags, `if`/`endif`, `foreach`/`endforeach`) come from Treesitter extras.
- **`gx`** opens the URL under the cursor in your browser.

---

## Config layout

Your customizations go in `~/.config/nvim/lua/config/` and `~/.config/nvim/lua/plugins/`. Never edit the LazyVim plugin itself.

```
~/.config/nvim/
├── init.lua                 -- bootstraps lazy.nvim, loads config
├── lua/
│   ├── config/
│   │   ├── autocmds.lua     -- your autocommands (added to LazyVim's)
│   │   ├── keymaps.lua      -- your keymaps (added to LazyVim's)
│   │   ├── lazy.lua         -- lazy.nvim setup + which extras load
│   │   └── options.lua      -- your options (added to LazyVim's)
│   └── plugins/
│       └── *.lua            -- one file per plugin/override, auto-loaded
└── lazyvim.json             -- tracks which extras you've enabled
```

**Overriding a LazyVim keymap** — you must delete it first if you want the key free:

```lua
-- lua/config/keymaps.lua
vim.keymap.del("n", "<S-h>")
vim.keymap.set("n", "<S-h>", "H", { desc = "Top of screen" })
```

**Overriding a plugin's options** — create a file in `lua/plugins/`:

```lua
-- lua/plugins/gitsigns.lua
return {
  "lewis6991/gitsigns.nvim",
  opts = {
    current_line_blame = true,
  },
}
```

**Disabling a plugin:**

```lua
return { "folke/flash.nvim", enabled = false }
```

---

## Troubleshooting

| Symptom                            | Check                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| A keymap does nothing              | `<leader>sk` and search for it — it may have moved between versions                   |
| `gd` doesn't work                  | `:LspInfo` — is a server attached? `:Mason` — is it installed?                        |
| Formatting not running             | `:ConformInfo` — is a formatter configured for this filetype?                         |
| Highlighting is wrong              | `:TSInstallInfo`, then `:TSInstall <lang>`                                            |
| Slow startup                       | `:Lazy profile`                                                                       |
| Something broke after an update    | `:Lazy` → `L` for the log; lazy.nvim supports lockfile restore                        |
| Clipboard doesn't reach the system | `:checkhealth` → look at the clipboard provider section                               |
| Key conflicts inside a multiplexer | Test `<C-h>`, `<C-/>`, `<S-h>`, `<S-l>`, `<C-s>` first — these are the usual suspects |

---

## Getting back up to speed

A realistic ramp for someone who is already very comfortable with Vim:

**Week 1 — prefixes only.** Learn `<leader><space>` (find file), `<leader>/` (grep), `<leader>,` (buffers), `<leader>e` (explorer), `<leader>gg` (lazygit). Use which-key for everything else. Don't try to memorize; just pause after `<leader>` and read.

**Week 2 — LSP.** Force yourself to use `gd`, `<C-o>`, `gr`, `K`, `<leader>ca`, `<leader>cr`, `]d`/`[d`. These are the ones that make Neovim competitive with VS Code, and they're only five or six keys.

**Week 3 — Treesitter text objects and flash.** `daf`, `cia`, `vic`, then `s` for jumping. This is where you exceed what VS Code can do.

**Week 4 — customize.** Now that you know what annoys you, edit `lua/config/keymaps.lua`. Not before.

Supporting resources: `:Tutor` inside Neovim for the basics refresher, `:help lazyvim` for the plugin's own docs, and `<leader>sk` whenever you're stuck. The LazyVim site (`lazyvim.org`) has a keymaps page generated from the same source as this document's contents, so it's a good cross-check against your specific version.

One habit that pays off disproportionately: when you catch yourself doing something inefficiently, stop and run `<leader>sk` with a guess at the word. LazyVim's descriptions are written in plain English, so searching "rename" or "stage" or "symbol" usually finds it in one try.
