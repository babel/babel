define(["exports", "foo", "foo-bar", "./directory/foo-bar"], function (exports, _foo, _fooBar, _directoryFooBar) {
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

  _foo2;
  _foo;
  _foo.bar;
  _foo.foo;
});
