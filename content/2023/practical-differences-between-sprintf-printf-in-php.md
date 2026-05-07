---
title: 'Practical Differences Between sprintf() & printf() in PHP'
date: '2023-11-27'
slug: practical-differences-between-sprintf-printf-in-php
excerpt: "The sprintf() and printf() functions in PHP are often used for formatting strings. While very similar, they serve slightly different purposes..."
category: 'PHP'
tags: ['quick-tips', 'tips-tricks']
---

The **`sprintf()`** and **`printf()`** functions in PHP are often used for formatting strings. While they are very similar, they serve _slightly_ different purposes. Let's dive into the practical differences between the two:

## sprintf()

The **`sprintf()`** function is primarily used to format a string but does not print it directly. Instead, it returns the formatted string as a result. The function takes a format string as its first parameter, followed by the values to be inserted into the format string.

Here's an example:

```php
$name = "John";
$age = 30;

$result = sprintf("My name is %s and I'm %d years old.", $name, $age);
echo $result;
```

**Output:**

```shell
My name is John and I'm 30 years old.
```

In the code snippet above, the format string contains placeholders `%s` and `%d` which are replaced with the values of `$name` and `$age`, respectively. The formatted string is stored in the `$result` variable for later use.

## printf()

On the other hand, the **`printf()`** function immediately outputs the formatted string. It does not return the formatted string as a result, as you see with `sprintf()`.

Let's take a look at an example:

```php
$name = "John";
$age = 30;

printf("My name is %s and I'm %d years old.", $name, $age);
```

**Output:**

```shell
My name is John and I'm 30 years old.
```

In this code snippet, the formatted string is printed directly to the output without being stored in a variable. It's useful when you want to print the formatted string directly without the need to store it or use it further in your code.

## To summarize

As you can see, both `sprintf()` and `printf()` provide a good way to format strings in PHP. The one to use mainly depends on whether you need to store the formatted string or print it directly.

You can read more about [`sprintf()`](https://www.php.net/manual/en/function.sprintf.ph) and [`printf()`](https://www.php.net/manual/en/function.printf.php), along with some additional examples, on their respective documentation in [the official PHP Manual](https://www.php.net/).
