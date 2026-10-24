"use strict";

function f(o) {
  let { a, ...rest } = o;
  a = 2;
  return rest;
}
expect(f({ a: 1, z: 3 })).toEqual({ z: 3 });
