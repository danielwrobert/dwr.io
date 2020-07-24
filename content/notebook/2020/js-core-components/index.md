---
title: 'JavaScript: The Core Components of Execution'
date: '2020-07-23'
slug: javascript-core-components-of-execution
excerpt: "In order for JavaScript to operate in the way that it does, it relies on three core components..."
tag: ['javascript']
---

In order for JavaScript to operate in the way that it does, it relies on three core components:

- Memory 
- The Thread of Execution
- The Call Stack

When a JavaScript program runs it goes through the code, line-by-line, and executes each line. This process is referred to as the Thread of Execution.

During this process, the program saves data (strings, arrays, and even functions) in it's Memory so that we can use that data later.

These two parts (Memory and the Thread of Execution) make up what is known as an Execution Context.

The main program has it's own (global) Execution Context. In addition, as soon as a function is executed within the program, a new (local) execution context will be created specific to that function.

The program will then enter that new context and exit (`return`) out into the previous execution context when the code within the function is completed. It can not continue on down the page while it is running that function, simultaneously. This inabiliy to execute more than one thing at a time is why JavaScript is referred to as a "Single-Threaded" language - it only has _one_ single thread of execution.

The memory inside of a function's execution context can also be thought of as it's "Local Memory". It is only available while running the function code and not anywhere outside that block.

So you might ask, how does JavaScript keep track of where it is within a program?

This is where the third component comes in - the Call Stack.

A call stack is a traditional way of storing information on our computer. We have a number of ways of doing this in JavaScript - we have arrays, we have objects, and we also have what's called "stacks".

The one key thing to note about the Call Stack is that the program is only engaged with the very top item on the stack at any given moment. That said, whatever is at the top of the Call Stack is where the program is at that moment in the Thread of Execution.

At the very bottom of the Call Stack there will always be the Global Execution Context. When items are added to the Call Stack, the program will run those top items and then eventually return to the Global Execution Context (`global()`) when everything above it has been executed and removed.