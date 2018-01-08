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
})(this, function (_exports, foo2, _fooBar, _fooBar2) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = _exports.test2 = _exports.test = void 0;
  foo2 = babelHelpers.interopRequireWildcard(foo2);
  var test;
  _exports.test = test;
  var test2 = 5;
  _exports.test2 = test2;
  var _default = test;
  _exports.default = _default;
  foo2.bar;
  foo2.foo;
});
