"use strict";

function foo1() {
  const data = babelHelpers.interopRequireDefault(require("white"));

  foo1 = function () {
    return data;
  };

  return data;
}

var foo2 = babelHelpers.interopRequireDefault(require("black"));
console.log(foo1());
console.log(foo2);
