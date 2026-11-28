"use strict";

const _excluded = ["a"],
  _excluded2 = ["a"];
function f(o) {
  let {
      a
    } = o,
    rest = babelHelpers.objectWithoutProperties(o, _excluded);
  a = 2;
  return rest;
}
function g(o) {
  let {} = o,
    rest = babelHelpers.objectWithoutProperties(o, _excluded2);
  return rest;
}
