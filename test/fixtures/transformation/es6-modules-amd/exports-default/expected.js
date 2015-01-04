"use strict";

define(["exports"], function (exports) {
  exports = foo;
  exports = 42;
  exports = {};
  exports = [];
  exports = foo;
  exports = function () {};

  exports = function () {};

  function foo() {}
  var Foo = function Foo() {};

  exports = Foo;
});
