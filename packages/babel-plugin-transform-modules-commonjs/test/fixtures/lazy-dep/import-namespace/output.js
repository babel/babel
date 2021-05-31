"use strict";

function foo() {
  const data = babelHelpers.interopRequireDefault(require("foo"));

  foo = function () {
    return data;
  };

  return data;
}

console.log(foo());
