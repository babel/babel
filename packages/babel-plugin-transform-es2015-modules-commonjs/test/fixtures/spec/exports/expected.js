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

Object.defineProperties(exports, {
  default: {
    enumerable: true,

    get() {
      return def;
    }

  },
  foo: {
    enumerable: true,

    get() {
      return foo;
    }

  },
  Bar: {
    enumerable: true,

    get() {
      return Bar;
    }

  },
  baz: {
    enumerable: true,

    get() {
      return baz;
    }

  }
});
(Object.freeze || Object)(exports);

const _outside = babelHelpers.specRequireInterop(require("outside"));

babelHelpers.specImportCheck(_outside, ["anything"]);


var def;
function foo() {
  def = "export mutation";
  return "foo";
}

class Bar {}

const baz = foo();