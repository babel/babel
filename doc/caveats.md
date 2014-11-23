# Caveats

In order for certain features to work they require certain polyfills. You can
satisfy **all** 6to5 feature requirements by using the included
[polyfill](polyfill.md). You may alternatively selectively include what you need:

| Feature                     | Requirements                                                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Abstract References         | [experimental](usage.md#experimental), `Symbol`                                                                              |
| Array destructuring         | `Array.isArray`, `Array.from`                                                                                                |
| Async functions, Generators | [experimental](usage.md#experimental), [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) |
| Comprehensions              | [experimental](usage.md#experimental), `Array.isArray`, `Array.from`                                                         |
| For Of                      | `Symbol`, `prototype[Symbol.iterator]`                                                                                       |
| Object spread/rest          | [experimental](usage.md#experimental), `Object.assign`                                                                       |
| Spread                      | `Array.isArray`, `Array.from`                                                                                                |

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
