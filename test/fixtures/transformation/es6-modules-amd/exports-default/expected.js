"use strict";

define(["exports", "module"], function (exports, module) {
  module.exports = foo;
  module.exports = 42;
  module.exports = {};
  module.exports = [];
  module.exports = foo;
  module.exports = function () {};

  module.exports = function () {};

  function foo() {}
  var Foo = function Foo() {};

  module.exports = Foo;
});
