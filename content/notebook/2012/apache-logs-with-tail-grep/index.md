---
title: 'Viewing Apache Logs with Tail and Grep'
date: '2012-08-21'
slug: viewing-apache-logs-with-tail-and-grep
excerpt: 'As a developer, there may be times when you need to monitor what is happening on an Apache server as live HTTP requests are coming in from a web page. In a UNIX environment, you can actually accomplish this quite painlessly through the command line, using the tail and grep commands.'
tags: ['apache', 'unix', 'workflow']
---

As a developer, there may be times when you need to monitor what is happening on an Apache server as live HTTP requests are coming in from a web page. In a UNIX environment, you can actually accomplish this quite painlessly through the command line, using the `tail` and `grep` commands. `Tail` is a command which outputs the last part of a file and the `grep` utility is used for pattern matching.

First, you will want to locate your Apache logs and `cd` into that directory. If you are running a local server through MAMP, you can most likely find them in the application folder.

```bash
cd /Applications/MAMP/logs

```

If you are running the Apache server that is preinstalled on OS X, you should be able to find them from the var folder in the root directory.

```bash
cd /var/log/apache2

```

Once you’ve found where your log files are located, you can monitor them using the `tail` command, as mentioned above. From the directory where the log files live, run the following command:

```bash
tail -f apache_access.log

```

The `-f` flag makes the `tail` command output additional data as it is appended to the log. `Tail` can also be piped through `grep` to pattern match and filter your output results. This way you won’t get such a potentially large output and will be able to pinpoint what you are looking for more easily.

```bash
tail -f apache_access.log | grep -i someusefulpattern

```

The `-i` flag in the above `grep` command will ignore case distinctions in both the pattern and the input files. You can also run the manual from the command line for a full list of options on each utility and use whatever variation best suits your scenario.

So there you have it – with just a short, one line command in your Terminal, you can easily monitor the HTTP requests on your Apache web server as they are happening.