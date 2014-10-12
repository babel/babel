exports.foo7 = foo7;

var foo = 1;
exports.foo = foo;

var foo2 = function () {};
exports.foo2 = foo2;

var foo3;
exports.foo3 = foo3;

let foo4 = 2;
exports.foo4 = foo4;

let foo5;
exports.foo5 = foo5;

let foo6 = 3;
exports.foo6 = foo6;

function foo7 () {}

var foo8 = function () {
  var foo8 = function foo8() {};
  return foo8;
}();
exports.foo8 = foo8;
