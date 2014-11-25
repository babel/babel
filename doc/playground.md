# Playground

Playground is a proving ground for **possible** ES7 proposals.

**NOTE: These features are in no way endorsed by Ecma International and are not a part of ES6. They might become a part of ECMAScript in the future.**

## Usage

    $ 6to5 --playground

```javascript
to5.transform("code", { playground: true });
```

**NOTE:** Enabling `playground` also enables [experimental support](usage.md#experimental).

## Features

 * [Memoization operator](#memoization-operator)
 * [Method binding](#method-binding)

### Memoization assignment operator

```javascript
var obj = {};
obj.x ?= 2;
obj.x; // 2

obj = { x: 1 };
obj.x ?= 2;
obj.x; // 1

obj = { x: undefined }
obj.x ?= 2;
obj.x; // undefined
```

```javascript
var obj = {};
obj.x ?= 2;
```

equivalent to:

```javascript
var obj = {};
if (Object.prototype.hasOwnProperty.call(obj, "x")) obj.x = 2;
```

### Method binding expression.

```javascript
var fn = obj:method;
var fn = obj:method("foob");
```

equivalent to:

```javascript
var fn = obj.method.bind(obj);
var fn = obj.method.bind(obj, "foob");
```

**NOTE:** Method binding can **only** be used as an **expression** and not as
statement.
