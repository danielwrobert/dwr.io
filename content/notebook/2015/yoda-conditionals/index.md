---
title: 'Yoda Conditional Statements'
date: '2015-01-02'
slug: yoda-conditional-statements
excerpt: 'Here’s a little gem on conditional statements that I saw for the first time in the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/coding-standards/php/#yoda-conditions "WordPress Coding Standards - Yoda Conditionals") a few months ago. When writing out a conditional logic, it is recommended to place the variable on the right side of the comparison operator and the constants or literals on the left.'
tag: ['coding standards']
---

Here’s a little gem on conditional statements that I saw for the first time in the [WordPress Coding Standards](https://make.wordpress.org/core/handbook/coding-standards/php/#yoda-conditions "WordPress Coding Standards - Yoda Conditionals") a few months ago. When writing out a conditional logic, it is recommended to place the variable on the right side of the comparison operator and the constants or literals on the left. Appropriately named “Yoda Conditions”, as the statement then reads backwards to how we would typically speak or think. I’ve never really thought about this before but it really is a handy little tip.

Take the following example (from the [handbook](https://make.wordpress.org/core/handbook/coding-standards/php/#yoda-conditions "WordPress Coding Standards - Yoda Conditionals")):

```php
if ( true == $the_force ) {
$victorious = you_will( $be );
}
```

Despite that it reads backwards, this makes sense programatically. If you were to accidentally omit a part of the comparison operator (an equals sign, for example) when writing out your statement, your code would fail because you can’t assign to a constant. Writing your conditional the other way around (non-Yoda) would evaluate to `true` via an accidental assignment operator. This would result in perfectly valid code and a bug that is much more difficult to track down.

Note that this only applies to ==, !=, ===, and !== comparisons. As stated in the handbook, “Yoda conditions for &lt;, &gt;, &lt;= or &gt;= are significantly more difficult to read and are best avoided.”