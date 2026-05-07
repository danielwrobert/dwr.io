---
title: 'Working With the Jobs Command'
date: '2023-01-13'
slug: working-with-the-jobs-command
excerpt: "UNIX-like operating systems have a handful of commands for managing running programs in the Terminal — here's how to use them..."
category: 'Unix'
tags: ['productivity', 'tips-tricks', 'unix']
---

UNIX-like operating systems (e.g., Linux, MacOS) have a handful of commands for managing your running programs (jobs) in the Terminal.

From your Terminal application, you have the ability to manually send jobs to run in the background, bring them to the foreground, or suspend them.

Below are the main job control commands with examples.

## List the Current Jobs

If you have any jobs active in your session, you can view them via the `jobs` command. If there are no active jobs, nothing will be output. _Note that by "active" I am also referring to suspended jobs._

```bash
danielrobert in ~ $ jobs
[1]  + suspended  vim .
```

## Bringing Jobs to the Foreground

You can move the next job in the queue to the foreground via the `fg` command.

```bash
danielrobert in ~ $ fg
```

Additionally, if you multiple jobs running in the background, you can move a specific item to the foreground by it's job id (`fg %[number]`).

```bash
danielrobert in ~ $ jobs
[1]  - suspended  vim .
[2]  + suspended (tty output)  nano index.html

danielrobert in ~ $ fg %2
```

In the above example, we have two jobs running. `fg` will resume Vim, where `fg %2` will resume Nano.

## Moving Jobs to the Background

There are a few different ways to send jobs to the background, whether that be in a running or suspended state.

In our examples above with the Vim and Nano sessions, we were working in those applications in the foreground and wanted to move them to the background (in a suspended state). This can be done with `control + z`, while in the running application.

```bash
danielrobert in ~ $ sleep 60
^Z
[1]  + 85158 suspended  sleep 60
```

Alternatively, similar to moving jobs to the foreground with the `fg` command, you can push the next job in the queue to the background via the `bg` command.

```bash
danielrobert in ~ $ bg
```

Like the `fg` command, you can use the job id (`bg %[number]`) to move a specific job to the background, if you have multiple jobs going. This is helpful if you have a suspended job that you want to continue to run in the background, freeing up the use of your current session.

```bash
danielrobert in ~ $ sleep 60
^Z
[1]  + 85158 suspended  sleep 60

danielrobert in ~ $ jobs
[1]  + suspended  sleep 60

danielrobert in ~ $ bg %1
[1]  + 85158 continued  sleep 60

danielrobert in ~ $ jobs
[1]  + running    sleep 60
```

Lastly, if you want to start a job and immediately send it to run in the background, you can append an `&` to the end of the command.

```bash
danielrobert in ~ $ sleep 60 &
[1] 86526

danielrobert in ~ $ jobs
[1]  + running    sleep 60
```

## Terminating Jobs

Now that we've talked about some different options for managing jobs while they're running, we're going to want to know how to quit those jobs altogether. There are a couple of ways to do this.

One way to terminate a job that is running in the foreground is to use the `control + c` command.

```bash
danielrobert in ~ $ caffeinate
^C
```

Another way to do this, regardless of the job status or whether it is running in the foreground / background, is to use the `kill` command along with the job id.

```bash
danielrobert in ~ $ caffeinate &
[1] 87739

danielrobert in ~ $ jobs
[1]  + running    caffeinate

danielrobert in ~ $ kill %1
[1]  + 87739 terminated  caffeinate

danielrobert in ~ $ jobs

danielrobert in ~ $ 
```

In addition, we can send a specific `kill` signal along with our command and job id, formatted as `kill -[signal] %[number]`.

```bash
danielrobert in ~ $ kill -9 %1
[1]  + 87739 killed  caffeinate
```

Some of the more commonly used signals are as follows:

```bash
 1       HUP (hang up)
 2       INT (interrupt)
 3       QUIT (quit)
 6       ABRT (abort)
 9       KILL (non-catchable, non-ignorable kill)
 14      ALRM (alarm clock)
 15      TERM (software termination signal)
```

You can see a list of available signals on the `kill` command via the `-l` option flag.

```bash
danielrobert in ~ $ kill -l
HUP INT QUIT ILL TRAP ABRT EMT FPE KILL BUS SEGV SYS PIPE ALRM TERM URG STOP TSTP CONT CHLD TTIN TTOU IO XCPU XFSZ VTALRM PROF WINCH INFO USR1 USR2
```

For a complete list of signals and their IDs, run `man signal` in your Terminal application.
