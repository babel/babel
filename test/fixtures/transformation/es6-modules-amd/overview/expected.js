define(["exports", "module", "foo", "foo-bar", "./directory/foo-bar"], function (exports, module, _foo, _fooBar, _directoryFooBar) {
  "use strict";

  var _extends = function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }

    return target;
  };

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo);

  var foo2 = _foo;
  var bar = _foo.bar;
  var bar2 = _foo.foo;
  exports.test = test;
  var test2 = exports.test2 = 5;

  exports["default"] = test;
  module.exports = _extends(exports["default"], exports);
});
