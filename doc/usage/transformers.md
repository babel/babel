---
layout: docs
title: Transformers
description: What are the various transformers?
permalink: /docs/usage/transformers/
---

## Standard

 - [arrowFunctions](/docs/tour#arrows)
 - [classes](/docs/tour#classes)
 - [computedPropertyNames](/docs/tour#enhanced-object-literals)
 - [constants](/docs/tour#let-const)
 - [defaultParameters](/docs/tour#default-spread-rest)
 - [destructuring](/docs/tour#destructuring)
 - [forOf](/docs/tour#iterators-for-of)
 - [generators](/docs/tour#generators)
 - [letScoping](/docs/tour#let-const)
 - [modules](/docs/tour#modules)
 - [propertyMethodAssignment](/docs/tour#enhanced-object-literals)
 - [propertyNameShorthand](/docs/tour#enhanced-object-literals)
 - [restParameters](/docs/tour#default-spread-rest)
 - [spread](/docs/tour#default-spread-rest)
 - [templateLiterals](/docs/tour#template-strings)
 - [unicodeRegex](/docs/tour#unicode)

## Experimental

- [abstractReferences](https://github.com/zenparsing/es-abstract-refs)
- [arrayComprehension](/docs/tour#comprehensions)
- [generatorComprehension](/docs/tour#comprehensions)
- [exponentiationOperator](https://github.com/rwaldron/exponentiation-operator)
- [objectSpread](https://github.com/sebmarkbage/ecmascript-rest-spread)

<blockquote class="to5-callout to5-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable experimental support. See <a href="/docs/usage/playground">experimental usage</a> for information.
  </p>
</blockquote>

## Other

### specMemberExpressionLiterals

Transform keywords and reserved word properties in member expressions into string literals:

```javascript
obj.default = "";
obj.throw = "";
obj.case = "";
obj.delete = "";
```

to

```javascript
obj["default"] = "";
obj["throw"] = "";
obj["case"] = "";
obj["delete"] = "";
```

### specPropertyLiterals

Transforms keywords and reserved word property keys into string literals:

```javascript
var obj = {
  default: "",
  throw: "",
  case: "",
  delete: ""
};
```

to

```javascript
var obj = {
  "default": "",
  "throw": "",
  "case": "",
  "delete": ""
};
```

### useStrict

ES6 modules are strict mode by default, this is a restricted variant of JavaScript
that enables more optimisations and better errors.

See the MDN article
[Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
for more information.

<blockquote class="to5-callout to5-callout-danger">
  <h4>Not recommended</h4>
  <p>
    It's highly recommended not to disable this transformer.
  </p>
</blockquote>

## Playground

 - [memoizationOperator](/docs/usage/playground#memoization-assignment-operator)
 - [methodBinding](/docs/usage/playground#method-binding)
 - [objectGetterMemoization](/docs/usage/playground#object-getter-memoization)

<blockquote class="to5-callout to5-callout-warning">
  <h4>Disabled by default</h4>
  <p>
    These are only usable if you enable playground support. See <a href="/docs/usage/playground">playground usage</a> for information.
  </p>
</blockquote>

### Other

#### react

## Optional transformers

6to5 provides various optional transformers for those of you who want
to take your code that extra mile.

```javascript
require("6to5").transform("code", { optional: ["transformerName"] });
```

```sh
6to5 --optional transformerName
```

### asyncToGenerator

Transforms async functions to a generator that uses a helper.
This is useful if you don't want to use `regenerator` or `bluebird`.

```javascript
async function foo() {
  await bar();
}
```

to

```javascript
var _asyncToGenerator = function (fn) {
  ...
};

var foo = _asyncToGenerator(function* () {
  yield bar();
});
```

### bluebirdCoroutines

Transforms async functions to their equivalent bluebird method.

```javascript
async function foo() {
  await bar();
}
```

to

```javascript
var Bluebird = require("bluebird");

var foo = Bluebird.coroutine(function* () {
  yield bar();
});
```

### coreAliasing

6to5 will uses various ES6 methods around your code such as `Array.from` and
`Object.assign`. This usually means that the use of a global polluting
polyfill is required, fortunately there's the `coreAliasing` transformer.

This transformer transforms code such as

```javascript
var arr = Array.from("foobar"); // ["f", "o", "o", "b", "a", "r"]
```

into

```javascript
var core = require("core-js");

var arr = core.Array.from("foobar");
```

Not only that but it can also transform iterator construction so

```javascript
var iterator = "foobar"[Symbol.iterator]();
iterator.next(); // { done: false, value: "f" }
```

becomes

```javascript
var core = require("core-js");

var iterator = core.$for.getIterator("foobar");
```

This means that you can use **every** single 6to5 feature without a
globally polluting polyfill, minus [caveats](/docs/caveats) and all.

This is fantastic for library authors as it means that you can write
your libraries with 6to5 and utilise all ES6 methods and syntax
without polluting your users global scope that may lead to collisions
and nasty bugs.

<blockquote class="to5-callout to5-callout-info">
  <h4></h4>
  <p>
    If you use this transformer then the package <code>core-js</code> is required. Run <code>npm install core-js --save</code> to add it to your current node/browserify project.
  </p>
</blockquote>

### protoToAssign

The `protoToAssign` optional transformer will transform all `__proto__`
assignments to a method that will do a shallow copy of all properties.

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

This is a case that you have to be aware of if you intend to use this
transformer.

### typeofSymbol

ES6 introduces a new native type called [symbols](/docs/tour#symbols).
This transformer wraps all `typeof` expressions with a method that
replicates native behaviour. (ie. returning "symbol" for symbols)

```javascript
typeof Symbol() === "symbol";
```

to

```javascript
var _typeof = function (obj) {
  return obj && obj.constructor === Symbol ? "symbol" : typeof obj;
};

_typeof(Symbol()) === "symbol";
```

### undefinedToVoid

Some JavaScript implementations allow `undefined` to be overwritten, this
may lead to peculiar bugs that are extremely hard to track down.

This transformer transforms `undefined` into `void 0` which returns `undefined`
regardless of if it's been reassigned.

```javascript
foo === undefined;
```

to

```javascript
foo === void 0;
```
