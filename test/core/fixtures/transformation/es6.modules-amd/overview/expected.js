define(["exports", "foo", "foo-bar", "./directory/foo-bar"], function (exports, _foo, _fooBar, _directoryFooBar) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _foo2 = babelHelpers.interopRequireDefault(_foo);

  exports.test = test;
  var test2 = 5;

  exports.test2 = test2;
  exports["default"] = test;

  _foo2["default"];
  _foo;
  _foo.bar;
  _foo.foo;
});