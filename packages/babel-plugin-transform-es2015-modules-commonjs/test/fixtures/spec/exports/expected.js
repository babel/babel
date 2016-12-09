"use strict";

const exports = module.exports = Object.create ? Object.create(null, {
  __esModule: {
    value: true
  }
}) : {
  __esModule: true
};

if (typeof Symbol === "function" && Symbol.toStringTag) {
  Object.defineProperty(exports, Symbol.toStringTag, {
    value: "Module"
  });
}

const _undefined = {
  enumerable: true,
  writable: true,
  configurable: true,
  value: undefined
};
Object.defineProperties(exports, {
  default: _undefined,
  Bar: _undefined,
  baz: _undefined
});
Object.defineProperty(exports, "foo", {
  enumerable: true,

  get() {
    return foo;
  }

});

var _outside = babelHelpers.specRequireInterop(require("outside"));

var def;
Object.defineProperty(exports, "default", {
  enumerable: true,

  get() {
    return def;
  }

});
function foo() {
  def = "export mutation";
  return "foo";
}

class Bar {}

Object.defineProperty(exports, "Bar", {
  enumerable: true,

  get() {
    return Bar;
  }

});
const baz = foo();
Object.defineProperty(exports, "baz", {
  enumerable: true,

  get() {
    return baz;
  }

});
(Object.freeze || Object)(exports);