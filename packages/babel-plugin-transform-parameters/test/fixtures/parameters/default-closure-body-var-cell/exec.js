"use strict";
function f(a = 1, b = () => a) {
  var a;
  a = 2;
  return [a, b()];
}
expect(f()).toEqual([2, 1]);
