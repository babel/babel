"use strict";

var x = "outside";
function outer() {
  var a = arguments.length <= 0 || arguments[0] === undefined ? function () {
    return eval("x");
  } : arguments[0];
  return (function () {
    var x = "inside";
    return a();
  })();
}
outer();