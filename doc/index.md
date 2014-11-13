**6to5** turns ES6+ code into vanilla ES5, so you can use next generation features **today.**

 - **Readable** - formatting is retained if possible so your generated code is as similar as possible.
 - **Extensible** - with a large range of [plugins](plugins.md) and **browser support**.
 - **Lossless** - **source map support** so you can debug your compiled code with ease.
 - **Compact** - maps directly to the equivalent ES5 with **no runtime**[\*](caveats.md#generators).

## Installation

It's as easy as:

    $ npm install -g 6to5

## Usage

Once you've installed 6to5, there are multiple paths you can take depending on
how you want to use it.

6to5 will simply compile your ES6+ script to ES5 if you pass it as an argument
to the command-line tool `6to5`:

    $ 6to5 script.js

If you have a file written using ES6+ and you just want to run it, `6to5-node`
has you covered:

    $ 6to5-node script.js

And it doesn't end here! To see all the ways you can use 6to5, check out the
[Usage](http://6to5.github.io/usage.html) page.

## [Features](features.md)

 - [Array comprehension](features.md#array-comprehension)
 - [Async functions](features.md#async-functions) via [regenerator](https://github.com/facebook/regenerator)
 - [Arrow functions](features.md#arrow-functions)
 - [Classes](features.md#classes)
 - [Computed property names](features.md#computed-property-names)
 - [Constants](features.md#constants)
 - [Default parameters](features.md#default-parameters)
 - [Destructuring](features.md#destructuring)
 - [For-of](features.md#for-of)
 - [Generators](features.md#generators) via [regenerator](https://github.com/facebook/regenerator)
 - [Generator comprehension](features.md#generator-comprehension)
 - [Let scoping](features.md#let-scoping)
 - [Modules](features.md#modules)
 - [Numeric literals](features.md#numeric-literals)
 - [Property method assignment](features.md#property-method-assignment)
 - [Property name shorthand](features.md#property-name-shorthand)
 - [React/JSX](react.md)
 - [Rest parameters](features.md#rest-parameters)
 - [Spread](features.md#spread)
 - [Template literals](features.md#template-literals)
 - [Unicode regex](features.md#unicode-regex)
