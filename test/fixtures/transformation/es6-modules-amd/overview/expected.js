define(["exports", "module", "foo", "foo-bar", "./directory/foo-bar"], function (exports, module, _foo, _fooBar, _directoryFooBar) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var foo = _interopRequire(_foo);

  var foo2 = _foo;
  var bar = _foo.bar;
  var bar2 = _foo.foo;
  exports.test = test;
  var test2 = exports.test2 = 5;

  module.exports = test;
});
