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

```javascript
import "foo"; // require("foo");

import foo from "foo"; // var foo = require("foo").default;
import * as foo from "foo"; // var foo = require("foo");

import {bar} from "foo"; // var bar = require("foo").bar;
import {foo as bar} from "foo"; // var bar = require("foo").foo;

export {test}; // exports.test = test;
export var test = 5; // var test = 5; exports.test = test;

export default test; // exports.default = test;
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
define(["foo"], function (_foo) {
  var exports = {};
  exports.bar = bar;

  var foo = _foo.default;

  function bar() {
    return foo("foobar");
  }

  return exports;
});
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
