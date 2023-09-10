define(["exports", "foo", "foo-bar", "./directory/foo-bar"], function (_exports, _foo, _fooBar, _fooBar2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.test2 = _exports.test = _exports.default = void 0;
  _foo = babelHelpers.interopRequireWildcard(_foo);
  var foo2 = _foo;
  var test;
  _exports.test = test;
  var test2 = 5;
  _exports.test2 = test2;
  var _default = test;
  _exports.default = _default;
  _foo.default;
  foo2;
  _foo.bar;
  _foo.foo;
});
