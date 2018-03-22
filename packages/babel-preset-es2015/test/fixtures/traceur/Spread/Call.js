function* G() {
  yield 'hi';
  yield 'there';
}

function f(...args) {
  return args;
}

var result = f(0, ...[1, 2], 3, ...G());
expect(result).toEqual([0, 1, 2, 3, 'hi', 'there']);;

result = f(...G());
expect(result).toEqual(['hi', 'there']);;

function g() {
  'use strict';
  expect(this).toBeUndefined();
}

g();
g(...[]);
