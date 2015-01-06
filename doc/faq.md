---
layout: docs
title: FAQ
description: Frequently Asked Questions and Answers
permalink: /docs/faq/
---

## Why are there `Array.from` and `Object.assign` calls in my code?! These functions don't exist!

This is a known [caveat](/docs/caveats). This is because 6to5 compiles to ES3 syntax but with
ES5 and ES6 methods. This is essential to emulate a complete ES6 environment so your code
wont break! You see, ES6 features such as [iterators](/docs/tour#iterators) and
[symbols](/docs/tour#symbols) require a lot of logic to work, and to accurately support these
it would mean **a lot** of boilerplate smoshed into your codebase. This is the approach taken
by other transpilers but 6to5 approaches it quite differently.

You have two options, depending on your use case:

 - Use the wonderful [core aliasing optional transformer](/docs/usage/transformers#core-aliasing). This is recommended if you're writing a library.
 - Or use the bundled 6to5 [polyfill](/docs/usage/polyfill). This is recommended if you're writing an entire application.
