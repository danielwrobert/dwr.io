---
title: 'Managing PHP Packages with Composer'
date: '2026-08-23'
slug: composer-package-management
excerpt: "My notes on Composer's caret version constraints, the actual differences between install, update, and update vendor/package, and a gotcha where composer require can quietly overwrite a constraint you set by hand..."
category: 'PHP'
tags: ['composer', 'dependency-management', 'workflow']
---

I use Composer constantly, but I realized I was mostly going on muscle memory for a few of its commands rather than actually understanding what they do differently. So I sat down and worked through the caret operator, the differences between `install` and the various flavors of `update`, and a `composer require` gotcha that had bitten me before. Cleaning those notes up into something reusable felt worth sharing.

## Semver and the caret (`^`) operator

The caret (`^`) operator means "compatible with," based on semantic versioning. The leftmost non-zero digit acts as the upper bound, and Composer will never cross it.

### `^1.22.4`

**Range:** `>= 1.22.4` and `< 2.0.0`

The floor is locked at `1.22.4`. Composer won't install anything below that, but it will accept any newer minor or patch release within the `1.x` line.

| Version | Allowed? |
| --- | --- |
| `1.22.3` | ❌ Below floor |
| `1.22.4` | ✅ Exact floor |
| `1.22.9` | ✅ Higher patch |
| `1.23.0` | ✅ Higher minor |
| `1.99.99` | ✅ Still within 1.x |
| `2.0.0` | ❌ Breaks upper bound |

### `^1.22`

**Range:** `>= 1.22.0` and `< 2.0.0`

With no patch version specified, the floor drops to `1.22.0`. The upper bound behaves the same as above.

| Version | Allowed? |
| --- | --- |
| `1.21.9` | ❌ Below floor |
| `1.22.0` | ✅ Exact floor |
| `1.22.3` | ✅ Higher patch |
| `1.23.0` | ✅ Higher minor |
| `2.0.0` | ❌ Breaks upper bound |

So the only practical difference between the two is the minimum version floor:

- `^1.22.4` sets the floor at `1.22.4`. Use this when a specific patch fixed a bug, patched a security issue, or introduced something your code relies on.
- `^1.22` sets the floor at `1.22.0`. Use this when any release from that minor version onward is fine.

Worth remembering: `composer.lock` freezes the exact resolved version regardless of what the constraint says. The constraint only comes into play when resolving a fresh install or running `composer update`.

## `composer install` vs `composer update` vs `composer update vendor/package`

These three get used somewhat interchangeably if you're not paying attention, but they do meaningfully different things.

### `composer install`

Reads `composer.lock` and installs exactly the versions frozen there, ignoring `composer.json` for version resolution entirely. If a package is missing from the lock file, it gets added, but an already-locked version never changes.

Use this for deploying to production or setting up a project from an existing repo. It's what guarantees a reproducible environment.

### `composer update` (no arguments)

Re-resolves every package against `composer.json`, finding the latest version each constraint allows, and rewrites `composer.lock` across the board.

I'd use this with caution. It can pull in unexpected updates to dozens of transitive dependencies you never intended to touch. It's better suited for a deliberate, full dependency audit than everyday use.

### `composer update vendor/package-name` (my default for day to day)

Re-resolves only the package you name, against the constraint already in `composer.json`, and rewrites just that entry in `composer.lock`. Everything else stays frozen.

```bash
composer update monolog/monolog
```

You can update multiple packages in one command too:

```bash
composer update monolog/monolog guzzlehttp/guzzle
```

A few flags worth knowing:

| Flag | Effect |
| --- | --- |
| `--dry-run` | Shows what would change without applying it, good for sanity-checking |
| `--with-dependencies` | Also updates the dependencies of the target package |
| `--no-dev` | Excludes `require-dev` packages, useful for production |

My safe workflow when I'm editing a constraint by hand looks like this:

```bash
# 1. Manually edit the constraint in composer.json first

# 2. Preview the change
composer update vendor/package-name --dry-run

# 3. Apply the change
composer update vendor/package-name
```

The way I keep these straight:

| Command | What it means |
| --- | --- |
| `composer install` | "Give me exactly what the lock file says." |
| `composer update vendor/pkg` | "Re-resolve this package against my constraint." |
| `composer update` | "Re-resolve everything." (use with caution) |

And always commit both `composer.json` and `composer.lock`, so the team and the deploy pipeline get deterministic installs via `composer install`.

## `composer require`

`composer require` adds or changes a package declaration and installs it in one step. It edits `composer.json` for you, then resolves and installs.

```bash
composer require monolog/monolog
```

That single command does three things atomically:

1. Finds the latest compatible version of the package
2. Writes the dependency into `composer.json`
3. Updates `composer.lock` and installs it

You can also pin a specific constraint:

```bash
composer require monolog/monolog:^2.0
```

### `composer require` vs `composer update vendor/package`

The real difference between the two comes down to who edits `composer.json`:

| Command | Who edits `composer.json`? | What it does |
| --- | --- | --- |
| `composer require` | Composer does it for you | Adds/changes the constraint and installs |
| `composer update vendor/pkg` | You edit it manually first | Resolves the constraint you already wrote |

Use `composer require` when you're adding a brand new package and want Composer to figure out a sensible constraint for you. Reach for `composer update vendor/package` when you've already edited the constraint by hand and want finer control over what ends up written in `composer.json`.

Running `require` against an already-installed package also works for bumping its constraint:

```bash
# Bumps the constraint and updates the package in one shot
composer require monolog/monolog:^3.0
```

That's functionally equivalent to manually editing `composer.json` and running `composer update monolog/monolog`, just condensed into one command. I still lean toward the manual edit plus `update` approach in most cases, since it's more explicit and easier to review in a pull request diff.

## The gotcha: `composer require` can silently overwrite a constraint you set by hand

This one has caught me before, so it's worth calling out on its own. If you manually add a package and constraint to `composer.json`, then later run `composer require vendor/package` without specifying a constraint, Composer will overwrite what you wrote with its own resolved version. Silently.

Say you manually write this in `composer.json`:

```json
"monolog/monolog": "^1.22.4"
```

Then run:

```bash
composer require monolog/monolog
```

Composer may rewrite it to:

```json
"monolog/monolog": "^3.0"
```

Your `^1.22.4` constraint is just gone.

There are two safe ways around this. Either use `composer update vendor/package`, which respects and keeps the constraint you already wrote and simply resolves against it:

```bash
composer update monolog/monolog
```

Or specify the constraint explicitly when you require it, which tells Composer exactly what to write and preserves your intent:

```bash
composer require monolog/monolog:^1.22.4
```

Bottom line: once you've manually edited `composer.json`, use `composer update vendor/package` to action that change. Running `composer require` without a constraint on a package that's already there is essentially telling Composer "forget what I wrote, pick a version for me."
