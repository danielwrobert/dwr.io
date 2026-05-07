---
title: 'Auto-Updating in WordPress Core'
date: '2023-01-06'
slug: auto-updating-in-wordpress-core
excerpt: "Every time I've installed a new installation of WordPress, I would install the latest version — until I needed to test against an older version of Core..."
category: 'WordPress'
tags: ['til', 'tips-tricks', 'wp-core']
---

Every time I've installed a new installation of WordPress, I would install the latest version. Naturally. And 99% of the time, why wouldn't you?

Today, however, I explicitly needed to test a release against an older version of WordPress Core. In doing so, I learned a couple of useful things.

## 1\. WP CLI Version Flag

This is more of a side-note but you can pass a `--version` flag to the `wp core download` sub-command in [WP CLI](https://make.wordpress.org/cli/handbook/) to specify a version. I kind of assumed this was possible when going into the task but, having never needed this before, it was nice to confirm it was there. If you need to download WordPress Core at version 5.9, for example, you can run the following command in your Terminal application:

```shell
wp core download --version=5.9
```

[Check out the docs](https://developer.wordpress.org/cli/commands/core/download/) for a full list of options.

Of course, it isn't super useful when you download a specific version only to have it automatically updated when you get to the installation step. But I'll cover that in the next section – which is the main purpose of this post!

## 2\. Core Auto-Updates

[As of WordPress version 5.6](https://make.wordpress.org/core/2020/11/10/wp5-6-auto-update-implementation-change/), new installations will auto-update to the latest version by default. I happened to have been trying to install version 5.9.5. After being tripped up by a couple attempts that resulted in the automatic version bump during the install, I realized what was going on and dug in a bit more.

Fortunately, there is a handy constant to disable this behavior:

In your `wp-config.php` file, right before the "stop editing" line, set the following before running the installation:

```php
define( 'WP_AUTO_UPDATE_CORE', false );
```

With this in place, you can safely run the installation without worrying about Core updating to the latest version.

It's important to note that this may cause issues with WordPress security and maintenance releases, development updates, and WP CLI functioning as expected. If you're looking to switch between different WP versions for testing, a better approach would be to use the WP CLI `update` sub-command with the specific version passed to the`--version` flag:

```bash
wp core update --version=6.5.5 --force
```

Again, there probably aren't too many scenarios where you _wouldn't_ want to install the latest version (for a variety of reasons). However, this is useful to at least be aware of!
