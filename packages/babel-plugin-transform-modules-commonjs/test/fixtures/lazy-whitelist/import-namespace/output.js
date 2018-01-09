"use strict";

var foo1 = babelHelpers.interopRequireWildcard(require("white"));

function foo2() {
  const data = babelHelpers.interopRequireWildcard(require("black"));

  foo2 = function () {
    return data;
  };

  return data;
}

console.log(foo1);
console.log(foo2());
