---
layout: docs
title: FAQ
description: Frequently asked questions and answers
permalink: /docs/faq/
---

## Why are there `Array.from` and `Object.assign` calls in my code?! These functions don't exist!

This is a known [/docs/caveats](). This is because 6to5 compiles to ES3 syntax but with ES5 and ES6 methods. I know, I know, this might not make much sense, but this is essential to emulate a complete ES6 environment so your code wont break!

You have two options, depending on your use-case:

 - Use the wonderful [coreAliasing optional transformer](/docs/usage/transformers#core-aliasing). This is recommended if you're writing a library.
 - Use the bundled 6to5 [polyfill](/docs/usage/polyfill). This is recommended if you're writing an entire application.
