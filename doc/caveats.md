---
layout: docs
title: Caveats
description: Just some things to keep in mind when using 6to5.
permalink: /docs/caveats/
redirect_from: /caveats.html
---

## Polyfills

In order for certain features to work they require certain polyfills. You can
satisfy **all** 6to5 feature requirements by using the included
[polyfill](polyfill.md).

You may alternatively selectively include what you need:

| Feature                     | Requirements                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Abstract References         | [experimental](experimental.md), `Symbol`                                                                              |
| Array destructuring         | `Array.from`                                                                                                           |
| Async functions, Generators | [experimental](experimental.md), [regenerator runtime](https://github.com/facebook/regenerator/blob/master/runtime.js) |
| Comprehensions              | [experimental](experimental.md), `Array.from`                                                                          |
| For Of                      | `Symbol`, `prototype[Symbol.iterator]`                                                                                 |
| Modules                     | `Object.assign`*                                                                                                       |
| Object spread/rest          | [experimental](experimental.md), `Object.assign`                                                                       |
| Spread                      | `Array.from`                                                                                                           |

*Only required for exporting a non-function `default` with additional `export`s.

## ES5

Since 6to5 assumes that your code will be ran in an ES5 environment it uses ES5
functions. So if you're using an environment that has limited or no support for
ES5 such as lower versions of IE then using the
[es5-shim](https://github.com/es-shims/es5-shim) along with the
[6to5 polyfill](polyfill.md) will add support for these methods.

## Internet Explorer

### Classes (10 and below)

If you're inheriting from a class then static properties are inherited from it
via [\_\_proto\_\_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto),
this is widely supported but you may run into problems with much older browsers.

**NOTE:** `__proto__` is not supported on IE <= 10 so static properties
**will not** be inherited.

You can use the `protoToAssign` optional transformer that will transform all
`__proto__` assignments to a method that will shallowly copy it over all
properties.

```javascript
require("6to5").transform("code", { optional: ["protoToAssign"] });
```

```sh
$ 6to5 --optional protoToAssign script.js
```

This means that the following **will** work:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
bar.b; // 2
```

however the following **will not**:

```javascript
var foo = { a: 1 };
var bar = { b: 2 };
bar.__proto__ = foo;
bar.a; // 1
foo.a = 2;
bar.a; // 1 - should be 2 but remember that nothing is bound and it's a straight copy
```

### Getters/setters (8 and below)

In IE8 `Object.defineProperty` can only be used on DOM objects. This is
unfortunate as it's required to set getters and setters. Due to this if
you plan on supporting IE8 or below then the user of getters and setters
isn't recommended.

**Reference**: [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty#Internet_Explorer_8_specific_notes).
