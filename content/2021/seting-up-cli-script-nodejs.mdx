---
title: 'Setting up a CLI Script in Node.js'
date: '2021-10-14'
slug: seting-up-cli-script-nodejs
excerpt: "Node.js is a perfect runtime to create a CLI that will run on any machine that has Node installed..."
tags: ['nodejs', 'javascript', 'cli']
---

Node.js is a perfect runtime to create a CLI script that can run on any machine that has Node installed.

A CLI program in Node is really just an ordinary Node.js app. In order to make the program available to be executed by your machine, we need to do a couple of small setup steps.

First, in the same way that you would create a bash script, you need to add a “hashbang” to the your CLI file  to tell the machine where the interpreter is located that is needed to execute this file.

```sh
#! /usr/bin/env node
```

The next thing we need to do is tell Node the name of our CLI is so we can actually run it in our terminal.

We can do this by adding a `bin` property to our app’s `package.json` file:

```json
"bin": {
	"my-cli": "./index.js"
}
```

In a web application, the app’s entry point is the `main` property. For a CLI script, that property is not quite as relevant. Instead, the above `bin` property is what is referenced as the main entry point.

The last thing we want to do is to install our CLI script on our local machine so we can run it. We can do this globally by running `npm install -g` from the CLI application’s root directory.

Now that your script is installed, it can be run by name globally in your terminal application!

## XKCD Demo

The purpose of this post wasn’t to create a meaningful CLI script, rather it was meant to be just a note on what is needed to get everything running. But for the sake of demonstration, let’s set up a short and simple example to hit the [XKCD JSON API](https://xkcd.com/json.html) and pull print the latest comic info to the page.

Let’s create a directory somewhere on our local filesystem named `xkcd`. Then, `cd` into that directory and run `npm init`, which will generate a `package.json` file.

Open the `package.json` file and add the aforementioned `bin` section. Let’s go ahead and name our script `xkcd` as well (`"xkcd": "./index.js"`) .

Next, let’s install the `node-fetch` package, which is a fetch client that will allow us to make an HTTP request to get the latest comic from the XKCD API:

```sh
npm i node-fetch@2.6.2 --save
```

_Notice that I am explicitly installing the latest v2 of the node-fetch package. The latest version is v3 but that is an ESM-only package, which is beyond the scope of this article._

Now, let’s create an `index.js` file in the root `xkcd` directory (alongside the `package.json` file) where we can create our script. At the very top of that file, remember to add the “hashbang” line that we mentioned earlier.

With all fo this in place, we can go ahead and add our script code:

```js
#! /usr/bin/env node

// import our fetch package
const fetch = require( 'node-fetch' );

// init fetch to XKCD API and log the response to the console
fetch('https://xkcd.com/info.0.json')
	.then( res => res.json() )
	.then( data => console.log(`
		Title: ${ data.title }\n
		Comic: ${ data.img }\n
		Alt Text: "${ data.alt }"
	`) )
	.catch( err => {
		console.log( 'Error: ', err.message );
	} );
```

Lastly, we can install this package globally on our system so we can run it from anywhere by it’s name (`xkcd`). From the project directory, we can run the following:

```sh
npm i -g
```

This tells us to install the package in the current project globally on our system. It is the shorthand equivalent to running `npm install -g`.

Note: Globally installing your script is not a hard requirement. You can, alternatively, run your script by passing it to the Node interpreter with a relative path to the main script file:

```sh
// assuming you are in the xkcd directory
node ./index.js
```

That being said, having to find and change into a specific project directory any time you want to run your script makes it much less useful.

With our package globally installed on our machine, we can run the `xkcd` command from our Terminal application to output the latest XKCD comic title, alt text, and comic image URL!