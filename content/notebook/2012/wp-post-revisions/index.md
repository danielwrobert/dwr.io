---
title: 'WordPress Post Revisions'
date: '2012-06-26'
slug: wordpress-post-revisions
excerpt: 'As of version 2.6, WordPress introduced a feature which autosaves your posts as revisions while you are editing them in the dashboard. While this functionality can be very useful, it can also be a bit of an annoyance. If a single post ends up going through multiple edits or simply takes a while to get finished, those revisions can add up.'
tags: ['post revisions']
---

As of version 2.6, WordPress introduced a feature which autosaves your posts as revisions while you are editing them in the dashboard. While this functionality can be very useful, it can also be a bit of an annoyance. If a single post ends up going through multiple edits or simply takes a while to get finished, those revisions can add up. I personally don’t see the need to have billions upon billions (ok, *slight* exaggeration) of revisions saved for every one of my posts. Additionally, that is just extra information that is getting stored in your database, which you may not need. Disabling this feature or limiting the amount of allowed revisions (which is what I opted for) is actually quite simple. It only takes one line of code in your `wp-config.php` file.

```php
/** Disables WordPress automatic post revisions. **/
define('WP_POST_REVISIONS', false);

/** Limits revisions to specified number (second parameter). **/
define('WP_POST_REVISIONS', 5);
```

Additionally, posts are autosaved every 60 seconds by default. This can be easily adjusted as well.

```php
/** Adjusts autosave interval to 120 seconds. **/
define('AUTOSAVE_INTERVAL', 120 );
```

There are just a few important things to note:

- First, if you should chose to limit your number of allowed revisions, you will still be able to save new revisions after you reach the specified limit. Your oldest revision will simply be removed to make room for your most recent.
- Next, if you already have existing posts with a bunch of unwanted revisions, this adjustment will not remove them. You will have to run a MySQL query to manually find and delete that information from your database.
- Lastly, should you choose to utilize any of the above snippets, they must be included BEFORE the line at the bottom of the wp-config file that reads:

```php
require_once(ABSPATH . 'wp-settings.php');

```

It took me a little while to figure that last one out, as I had my adjustments placed at the very end of the file and wondered why it was not seeming to work.

And that’s that. Nothing too daunting. Hopefully in the future, WordPress will have the ability to manage this directly through the admin. Until then, it’s just a line or two of code to add to your `wp-config.php`.

### References / Resources

- WordPress Codex – [Revision Management](http://codex.wordpress.org/Revision_Management "WordPress Codex")
- Sitepoint – [How to Control Post Revisions in WordPress](http://www.sitepoint.com/configure-wordpress-post-revisions/ "WordPress Post Revisions")