---
title: 'Virtual Terminal Sessions with Screen'
date: '2014-01-14'
slug: virtual-terminal-sessions-with-screen
excerpt: 'Not so long ago, a co-worker and friend of mine introduced me to the UNIX application, screen. While I was really excited to learn of something so useful, I was also deeply saddened in realizing that it was right under my nose all this freaking time. In this short post, I’m going to show you how you can take advantage of this clever little utility.'
tag: ['unix', 'workflow']
---

Not so long ago, a co-worker and friend of mine introduced me to the UNIX application, `screen`. While I was really excited to learn of something so useful, I was also deeply saddened in realizing that it was right under my nose all this freaking time. In this short post, I’m going to show you how you can take advantage of this clever little utility.

So what is this `screen` thing? `Screen` is a UNIX utility that allows you to create/access multiple separate terminal sessions within a single terminal window or remote session. So, in English, this gives you the ability to fire up a terminal process, detach it and let it run and then re-attach it later on. When a detached session is reconnected, it picks back up where the process has continued to – not where you left off when you detached. This is an especially cool concept if you need to SSH into a remote machine and run some processes. You can detach your screen, disconnect your terminal, go do something else and when you reconnect later on, it’s as if you never left in the first place. What I really like about this utility though is that it is really easy to manage and is installed by default on UNIX machines.

So let’s see how it works. Fire up a new terminal window and test out the following commands:

```bash
# Start up a new screen session (no spaces allowed)
screen -S [session_name]

# Detach current screen session
Control + a + d

# List running screen processes
screen -ls

# Detach a screen process running in another terminal window
screen -d [session_name]

# Reattach an existing process
screen -r [session_name]

# Quit running session
screen -X -S [session_name] quit
```

Additionally, you can open and close new windows in any given screen session:

```bash
# Open a new window in the current screen socket
Control + a + c

# Close current window in the current screen socket
Control + a + k
```

Those are the main commands that I use most often. For example, when I am working on a web application, I will likely have at least one process constantly running – wether that be a server, compiling Sass, or multiple tasks managed with Grunt. It’s really nice to be able to set that process up on a detached `screen` session and forget about it until I’m ready to move on to something else.

For a full list of commands, run `screen --help` from the Terminal or check out this handy [Quick Reference](http://aperiodic.net/screen/quick_reference "screen Quick Reference"). I hope you found this as useful as I did and, as always, thanks for reading!

*Update 2016-12-23: Added snippets for window management from within a screen socket.*