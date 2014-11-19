define("modules-amd/exports-named/expected", ["exports"], function (exports) {
  "use strict";

  exports.foo = foo;
  exports.foo = foo;
  exports.bar = bar;
  exports.bar = foo;
  exports["default"] = foo;
  exports["default"] = foo;
  exports.bar = bar;
});
