# Modules

## Usage

### CLI

    $ 6to5 --modules common script.js

### Node

```javascript
var to5 = require("6to5");
to5.transform('import "foo";', { modules: "common" });
```

## Formats

### Common (Default)

**In**

```javascript
import "foo";

import foo from "foo";
import * as foo from "foo";

import {bar} from "foo";
import {foo as bar} from "foo";

export {test};
export var test = 5;

export default test;
```

**Out**

```javascript
require("foo");

var foo = require("foo").default;
var foo = require("foo");

var bar = require("foo").bar;
var bar = require("foo").foo;

exports.test = test;
var test = 5; exports.test = test;

exports.default = test;
```

### AMD

**In**

```javascript
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

**Out**

```javascript
define(["exports", "foo"], function (exports, _foo) {
  exports.bar = bar;

  var foo = _foo.default;

  function bar() {
    return foo("foobar");
  }
});
```

You can optionally specify to include the module id (using the `--amd-module-id` argument):

```javascript
define("filename", ["exports", "foo"], function (exports, _foo) {})
```

### UMD

**In**

```javascript
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

**Out**

```javascript
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"));
  }
})(function (exports) {
  exports.bar = bar;

  var foo = _foo.default;

  function bar() {
    return foo("foobar");
  }
});
```

### Ignore

**In**

```javascript
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

**Out**

```javascript
function bar() {
  return foo("foobar");
}
```

### Register

**In**

```javascript
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

**Out**

```javascript
System.register("bar", ["foo"], function ($__export) {
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
      $__export("bar", bar);
    }
  };
});


```

## Custom

You can alternatively specify module names instead of one of the built-in types.

    $ 6to5 --modules custom-module-formatter

**node_modules/custom-module-formatter/index.js**

```javascript
module.exports = ModuleFormatter;

function ModuleFormatter() {

}

ModuleFormatter.prototype.transform = function (ast) {
  // this is ran after all transformers have had their turn at modifying the ast
  // feel free to modify this however
};

ModuleFormatter.prototype.import = function (node, nodes) {
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.importSpecifier = function (specifier, node, nodes) {
  // specifier is an ImportSpecifier
  // node is an ImportDeclaration
};

ModuleFormatter.prototype.export = function (node, nodes) {
  // node is an ExportDeclaration
};

ModuleFormatter.prototype.exportSpecifier = function (specifier, node, nodes) {
  // specifier is an ExportSpecifier
  // node is an ExportDeclaration
};
```
