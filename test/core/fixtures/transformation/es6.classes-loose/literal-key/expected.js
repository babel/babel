"use strict";

var Foo = (function () {
  function Foo() {
    babelHelpers.classCallCheck(this, Foo);
  }

  Foo.prototype["bar"] = function bar() {};

  return Foo;
})();
