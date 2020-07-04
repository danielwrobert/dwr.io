---
title: 'TIL: GitHub Emojis'
date: '2020-07-03'
slug: til-github-emojis
excerpt: "I knew GitHub supported emojis - I often use them in PR messages, comments, etc. What I didn't know is that you can also add emojis in your commit messages."
tag: ['til', 'github']
---

I knew GitHub supported emojis - I often use them in PR messages, comments, etc. What I _didn't_ know is that you can also add emojis in your commit messages.

For example, if you wanted to include an Octocat emoji, you can write your commit message as follows:

```sh
git commit -m "Initial commit :octocat:"
```

If you've spent any time working in Slack or using Telegram, you should feel right at home here.

The next time you push up to GitHub, the `:octocat:` portion of the above example will be translated to the following emoji:

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png?v8) 

You can view the [emojis endpoint](https://api.github.com/emojis) on the GitHub API to see a full list of supported emojis (which can also be used in comments, PR messages, etc).