"use strict";

function f(o) {
  let { a, ...rest } = o;
  a = 2;
  return rest;
}

function g(o) {
  let { a, ...rest } = o;
  return rest;
}
