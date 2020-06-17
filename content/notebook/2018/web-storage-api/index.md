---
title: 'Intro to the Web Storage API'
date: '2018-01-27'
slug: intro-to-the-web-storage-api
excerpt: 'There are instances where storing data in a users browser can be really helpful. Up until somewhat recently, saving the state of the application locally in the browser via Cookies was the main way to achieve this. Cookies have limitations, however. For example, their max size (4093 bytes) and the fact that they have to me transmitted with every request.'
tag: ['javascript', 'web storage']
---

### What is Web Storage and when would you use it?

There are instances where storing data in a users browser can be really helpful. Up until somewhat recently, saving the state of the application locally in the browser via Cookies was the main way to achieve this. Cookies have limitations, however. For example, their max size (4093 bytes) and the fact that they have to me transmitted with every request.

The Web Storage API, on the other hand, allows browsers to store key/value pairs, similar to an object, in a much more intuitive way than using cookies. The main difference between the data in Web Storage and a regular object is that the value in a Local Storage property is always a string (integer keys will be automatically converted to strings). You can not nest objects as values in Web Storage, the way that you can in an object.

Web Storage has two stores – Local Storage and Session Storage.

Local Storage lets a site save up to 5MB of data to a users computer/browser. That data can be accessed using JS on any other page on that same site. That data even lasts between visits and after the browser has closed.

Session Storage is almost identical to Local Storage, except for how long the data lasts. With Session Storage, the data persists only for the duration of the page session (as long as the browser is open, including page reloads and restores). It is cleared out when the browser window is closed .

There are many use-cases for local storage on a site. A few examples may include the following:

- Save recent searches and use that data on other pages (for example, adding a recently viewed pages section in the sidebar of your site)
- Save simple, non-secure form entry data. If a user navigates away from the page where the form lives, they don’t have to start over from scratch when they return.
- Save a list of login names (NOT PASSWORDS) that have been used in the past to save the user from typing it out again.
- Save preferences/state for an in-browser app so they don’t need to be reset every time the app is open. This is exactly how I have the theme switcher on this blog set up. You can view the [source code on GitHub](https://github.com/danielwrobert/independent-publisher-2-plus/blob/master/js/main.js).
- Promotional modal boxes for only first-time users
- The list goes on!

A few things to keep in mind, if you want to use Local Storage:

- It is *not* a secure way to store information, so avoid storing any sensitive information. While data can only be accessed on the domain which the values were set, any JavaScript that executes on that page has access to that data.
- As mentioned above, you can only store string data – you couldn’t use Web Storage to store a binary file, such as an image, movie, etc.
- Consider how much data you want to store. When a page loads, browsers load the data in Web Storage, synchronously. This means that the browser is halted while the data in your Web Storage is being loaded. If you have a lot of data set, your users may experience a slower/delayed page load during that time. 5MB worth of string data is a fair amount so if you do need to store that much, you may want to consider an alternative approach.

Depending on your browser support requirements, it’s not a bad idea to test for Web Storage before using it at all. Web Storage has [pretty good support](https://caniuse.com/#search=webstorage). Various browsers offer settings that disable Web Storage. Because of this, a browser may support it but not make it available to the scripts on the page. This may be a very small set of users but the overhead added for testing for Web Storage is also very small.

### How to use the Web Storage API

You can store, retrieve, and delete data in local storage like you would any JavaScript object or via the following Web Storage API methods:

- `setItem()`: takes two arguments — the key of the data item to create/modify, and the value to store in it.
- `getItem()`: takes a single argument — the name of the key you want to retrieve the value of.
- `removeItem()`: takes a single argument — the key of the data item you want to remove — and removes it from the storage object for that domain.
- `clear()`: takes no arguments, and simply empties the entire storage object for that domain.
- `key`: takes a single argument — an integer representing the number of the key you want to get the name of (this is a zero-based index). It then returns the name of the nth key in the storage. The order of keys is user-agent defined, so you should not rely on it.
- `length`: is a read-only property of the Storage interface returns an integer representing the number of data items stored in the Storage object

It is worth noting, per the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), that it is recommended to use the Web Storage API methods, as there are [certain pitfalls](http://2ality.com/2012/01/objects-as-maps.html) when using plain objects as maps from strings to values.

You can try out using Web Storage right in your web browser, on any site. Open your dev tools and go to the Console tab. Once you have the Console open, go ahead and set your first item in localStorage with the following line of code:

```javascript
localStorage.setItem( 'color', '#8507d4' );

```

In the above function, the first parameter is the key that you’re storing and the second is the value.

Now, to retrieve this value once it has been set, you can use `getItem()` and reference the item key:

```javascript
localStorage.getItem( 'color' );

```

Session Storage works the exact same way, you would just need to replace `localStorage` with `sessionStorage` in the examples above.

These items are specific to the site you are setting them on. You can not, for example, retrieve items that you have set on wordpress.com from google.com, or vise versa.

Once you’re finished with a piece of data, you can remove it with `removeItem()` and reference the item key:

```javascript
localStorage.removeItem( 'color' );

```

If you want to remove *all* of the storage, you can use `clear()`:

```javascript
localStorage.clear();

```

That’s just about all there is to using Web Storage with JavaScript. Go ahead and give it a try for yourself!

**Credits &amp; Resources**

- [MDN – Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)
- [Treehouse – Using Local Storage with JavaScript](https://teamtreehouse.com/library/using-local-storage-with-javascript)