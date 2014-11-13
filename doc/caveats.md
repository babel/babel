# Caveats

## Async/Generators

The [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js)
and an [ES6 polyfill](polyfill.md) are required in order for generators to work.

## Classes

Built-in classes such as `Date`, `Array` and `DOM` cannot be subclassed due to
limitations in ES5 implementations.

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

**NOTE:** `__proto__` is not supported on IE <= 9 so static properties
**will not** be inherited. A possible workaround is to use `super();`:

```javascript
class Foo {
  static foo() {

  }
}

class Bar extends Foo {
  static foo() {
    super();
  }
}
```

## For-of

A polyfill is required for for-of functionality that implements `Symbol` and
adds `prototype[Symbol.iterator]` behaviour to built-ins. Using the polyfills
specified in [polyfill](polyfill.md) suffices.

## Spread

An [ES6 polyfill](polyfill.md) is required in order for spread to work. More
specifically a polyfill for `Array.from`.
