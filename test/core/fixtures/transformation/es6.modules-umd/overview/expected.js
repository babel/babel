(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "foo", "foo-bar", "./directory/foo-bar"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("foo"), require("foo-bar"), require("./directory/foo-bar"));
  } else {
    var module = {
      exports: {}
    };
    factory(module.exports, global.foo2, global.fooBar, global.directoryFooBar);
    global.actual = module.exports;
  }
})(this, function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foo2 = _interopRequire(_foo);

  exports.test = test;
  var test2 = 5;

  exports.test2 = test2;
  exports["default"] = test;

  _foo.bar;
  _foo.foo;
});
