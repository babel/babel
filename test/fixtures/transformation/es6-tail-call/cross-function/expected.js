"use strict";

function f(n) {
  return n <= 0 ? "foo" : to5Runtime.tailCall(g, [n - 1]);
}

function g(n) {
  return n <= 0 ? "goo" : to5Runtime.tailCall(f, [n - 1]);
}
