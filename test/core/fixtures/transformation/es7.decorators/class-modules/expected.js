"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

var _foo2 = babelHelpers.interopRequireDefault(_foo);

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, _Foo);
  }

  var _Foo = Foo;
  Foo = (0, _foo2["default"])(Foo) || Foo;
  return Foo;
})();

exports["default"] = Foo;
module.exports = exports["default"];
