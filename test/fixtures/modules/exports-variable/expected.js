var foo;
var foo2;
var foo3;
var foo8;
(function () {
  foo = 1;
  exports.foo = foo;

  foo2 = function () {};
  exports.foo2 = foo2;

  exports.foo3 = foo3;

  var foo4 = 2;
  exports.foo4 = foo4;

  var foo5;
  exports.foo5 = foo5;

  var foo6 = 3;
  exports.foo6 = foo6;

  function foo7 () {}
  exports.foo7 = foo7;

  foo8 = function () {
    function foo8() {
    }
    return foo8;
  }();
  exports.foo8 = foo8;
}());
