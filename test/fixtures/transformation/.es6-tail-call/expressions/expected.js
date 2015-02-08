"use strict";

(function f(n) {
  return n <= 0 ? "foo" : (doSmth(), getTrueValue() && (getFalseValue() || to5Runtime.tailCall(f, [n - 1])));
})(1000000, true) === "foo";
