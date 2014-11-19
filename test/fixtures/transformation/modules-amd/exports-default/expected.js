define("modules-amd/exports-default/expected", ["exports"], function (exports) {
  "use strict";

  exports["default"] = 42;
  exports["default"] = {};
  exports["default"] = [];
  exports["default"] = foo;
  exports["default"] = function () {};
  exports["default"] = function () {};
  function foo() {}
  exports["default"] = foo;
  var Foo = function Foo() {};

  exports["default"] = Foo;
});
