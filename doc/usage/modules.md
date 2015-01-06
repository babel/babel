---
layout: docs
title: Modules
description: How to use module formatters.
permalink: /docs/usage/modules/
redirect_from: /modules.html
---

<p class="lead">
  6to5 has the ability to transpile ES6 modules to the module system of your
  choice. You can even easily create your own.
</p>

## Usage

```sh
$ 6to5 --modules common script.js
```

```js
to5.transform('import "foo";', { modules: "common" });
```

## Formats

### Common (Default)

**Usage**

```sh
$ 6to5 --modules common
```

**Example**

```js
export default test;

export {test};
export var test = 5;

import "foo";

import foo from "foo";
import * as foo from "foo";

import {bar} from "foo";
import {foo as bar} from "foo";
```

```js
"use strict";

var _interopRequire = function (obj) {
  return obj && (obj["default"] || obj);
};

exports = module.exports = test;

exports.test = test;
var test = exports.test = 5;

require("foo");

var foo = _interopRequire(require("foo"));

var foo = require("foo");

var bar = require("foo").bar;
var bar = require("foo").foo;
```

### AMD

**Usage**

```sh
$ 6to5 --modules amd
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
define(["exports", "foo"], function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  exports.bar = bar;
  var foo = _interopRequire(_foo);

  function bar() {
    return foo("foobar");
  }
});
```

You can optionally specify to include the module id (using the `--amd-module-id`
argument):

```js
define("filename", ["exports", "foo"], function (exports, _foo) {})
```

### System

**Usage**

```sh
$ 6to5 --modules system
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
System.register("bar", ["foo"], function (_export) {
  "use strict";

  var __moduleName = "bar";

  var foo;
  function bar() {
    return foo("foobar");
  }
  return {
    setters: [function (m) {
      foo = m.default;
    }],
    execute: function () {
      _export("bar", bar);
    }
  };
});
```

### UMD

**Usage**

```sh
$ 6to5 --modules umd
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports, _foo) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  exports.bar = bar;
  var foo = _interopRequire(_foo);

  function bar() {
    return foo("foobar");
  }
});
```

### Ignore

**Usage**

```sh
$ 6to5 --modules ignore
```

**Example**

```js
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

```js
function bar() {
  return foo("foobar");
}
```

### Custom

You can alternatively specify module names instead of one of the built-in types.

**Usage**

```js
$ 6to5 --modules custom-module-formatter
```

**Example**

**`node_modules/custom-module-formatter/index.js`**

```js
module.exports = ModuleFormatter;

function ModuleFormatter() {}

ModuleFormatter.prototype.transform = function (ast) {
  // this is ran after all transformers have had their turn at modifying the ast
  // feel free to modify this however
};

ModuleFormatter.prototype.importDeclaration = function (node, nodes) {
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  // specifier is an ImportSpecifier
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.exportDeclaration = function (node, nodes) {
  // node is an ExportDeclaration
};

ModuleFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  // specifier is an ExportSpecifier
  // node is an ExportDeclaration
};
```
