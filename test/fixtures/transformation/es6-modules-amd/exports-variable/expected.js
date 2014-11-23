define(["exports"], function (exports) {
  "use strict";

  exports.foo7 = foo7;
  var foo = exports.foo = 1;
  var foo2 = exports.foo2 = function () {};
  var foo3;
  var foo4 = exports.foo4 = 2;
  var foo5;
  var foo6 = exports.foo6 = 3;
  function foo7() {}
  var foo8 = function foo8() {};

  exports.foo8 = foo8;
});
