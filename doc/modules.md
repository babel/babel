# Modules

## Usage

### CLI

```sh
$ 6to5 --modules common script.js
```

### Node

```javascript
var to5 = require("6to5");
to5.transform('import "foo";', { modules: "common" });
```

## Formats

 * [AMD](#amd)
 * [Common (Default)](#common-default)
 * [Ignore](#ignore)
 * [System](#system)
 * [UMD](#umd)

### Common

```sh
$ 6to5 --modules common
```

**In**

```javascript
export default test;

export {test};
export var test = 5;

import "foo";

import foo from "foo";
import * as foo from "foo";

import {bar} from "foo";
import {foo as bar} from "foo";
```

**Out**

```javascript
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

```sh
$ 6to5 --modules amd
```

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

You can optionally specify to include the module id (using the `--amd-module-id` argument):

```javascript
define("filename", ["exports", "foo"], function (exports, _foo) {})
```

### UMD

```sh
$ 6to5 --modules umd
```

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

```sh
$ 6to5 --modules ignore
```

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

### System

```sh
$ 6to5 --modules system
```

**In**

```javascript
import foo from "foo";

export function bar() {
  return foo("foobar");
}
```

**Out**

```javascript
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

## Custom

You can alternatively specify module names instead of one of the built-in types.

```sh
$ 6to5 --modules custom-module-formatter
```

**node_modules/custom-module-formatter/index.js**

```javascript
module.exports = ModuleFormatter;

function ModuleFormatter() {

}

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
