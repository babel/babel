"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

var _foo2 = babelHelpers.interopRequireWildcard(_foo);

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  Foo = _foo2["default"](Foo) || Foo;
  return Foo;
})();

exports["default"] = Foo;
module.exports = exports["default"];
