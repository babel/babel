# Caveats

In order for certain features to work they require certain polyfills. You can
satisfy **all** 6to5 feature requirements by using the included
[polyfill](polyfill.md). You may alternatively selectively include what you need:

| Feature                     | Requirements                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Abstract References         | [experimental](experimental.md), `Symbol`                                                                              |
| Array destructuring         | `Array.isArray`, `Array.from`                                                                                          |
| Async functions, Generators | [experimental](experimental.md), [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) |
| Comprehensions              | [experimental](experimental.md), `Array.isArray`, `Array.from`                                                         |
| For Of                      | `Symbol`, `prototype[Symbol.iterator]`                                                                                 |
| Object spread/rest          | [experimental](experimental.md), `Object.assign`                                                                       |
| Spread                      | `Array.isArray`, `Array.from`                                                                                          |

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

## 6to5-node

It is necessary to manually install `kexec` package on Unix-like OSes for
`6to5-node` to correctly handle signals.

**It is not recommended to use `6to5-node` with a process manager (`supervisord`, `upstart`, `systemd`, ...) without first installing `kexec`!**
