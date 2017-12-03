# Limitations #

The goal of **esdown** is to provide fast and inconspicuous compilation of ES6+ code to
efficient ES5 code.  There are some aspects of ES6 which are difficult to translate while
maintaining these priorities.  Keep these limitations in mind when coding with ES6 and
**esdown**.

## Runtime Library ##

In order to keep the translated code clean and similar in appearance to the original
source code, **esdown** uses a small (9K unminified) runtime library to support certain
features.  The features which require runtime support are:

- Classes
- Computed property names
- Destructuring
- Spread
- Async functions
- Async generator functions

There are a couple of options for managing this depedency:

1. Embed the runtime library in the output code using the `--runtime` flag.
1. Install the **esdown-runtime** NPM package into your project as a dependency.

## For-Of Statements ##

For-of statements requires the presence of `Symbol.iterator`.  In environments which do not
provide `Symbol.iterator` an ES6 polyfill library can be used.  The polyfill library used
by **esdown** is called **esdown-polyfill** and can be installed with NPM.

## Map and Set Polyfills ##

For efficiency reasons, the Map and Set polyfills that are provided with **esdown** only
accept strings and numbers as keys.

## Classes ##

Subclassing is not allowed by **esdown**.  In ES6 classes, the super class is initialized
by calling `super(...args)`, which is similar to constructing the superclass using `new`.
In order to set the prototype chain correctly, an ES6 engine will send a hidden parameter
called `new.target` to the superclass constructor.  Unfortunately, we can't simulate
`new.target` for arbitrary superclasses.

The typical method of simulating `super(...args)` is to simply call the superclass's
constructor as a regular function, similar to how programmers have implemented "subsclassing"
in ES5.  However, this method will result in code that may break when the superclass is an
actual ES6 class, because ES6 classes will throw an error when called as a function.

## Block-Scoped Variables ##

Temporal dead zones of block-scoped variables are not enforced by **esdown**.

In ES6, if you attempt to access the value of a block-scoped variable before it has been
initialized, a runtime error will be thrown.

```js
f(); // ReferenceError: x is not defined
let x;
function f() {
    x = 0;
}
```

This is called a "temporal dead zone".  A temporal dead zone is very difficult to implement
efficiently with ES5 code, because in the general case it requires run-time initialization
checks for each variable.
