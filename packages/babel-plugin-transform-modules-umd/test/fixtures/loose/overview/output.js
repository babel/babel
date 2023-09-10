(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.foo, global.fooBar, global.fooBar);
    global.input = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _foo, _fooBar, _fooBar2) {
  "use strict";

  _exports.__esModule = true;
  _exports.test2 = _exports.test = _exports.default = void 0;
  _foo = babelHelpers.interopRequireWildcard(_foo);
  var foo2 = _foo;
  var test;
  _exports.test = test;
  var test2 = 5;
  _exports.test2 = test2;
  var _default = test;
  _exports.default = _default;
  _foo.bar;
  _foo.foo;
});
