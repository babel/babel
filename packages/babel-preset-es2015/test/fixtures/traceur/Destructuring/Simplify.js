// It probably doesn't make a difference to the results, but the private name
// transformation turns array lookup and member access into function calls, and
// I'd like to keep that from being a confounding factor.

'use strict';

var a, b, c, x, y, z;
a = b = c = x = y = z = undefined;

// ----------------------------------------------------------------------------

function checkA() {
  expect(a).toBe(1);
  expect(b).toBeUndefined();
  expect(c).toBeUndefined();
  a = b = c = undefined;
}

function checkAb() {
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBeUndefined();
  a = b = c = undefined;
}

function checkAbc() {
  expect(1).toBe(a);
  expect(2).toBe(b);
  expect(3).toBe(c);
  a = b = c = undefined;
}

// ----------------------------------------------------------------------------

// misc single assignment
var [a] = 42 === 42 ? [1] : [42];
checkA();
[a] = 42 === 42 ? [1] : [42];
checkA();

var [a] = null || [1];
checkA();
[a] = null || [1];
checkA();

// ParseTreeType.MEMBER_EXPRESSION
x = {x: {a: 1, b: 2, c: 3}};
var {a, b, c} = x.x;
checkAbc();

var {a} = x.x;
checkA();

x = {x: [1, 2, 3]};
var [a] = x.x;
checkA();
[a] = x.x;
checkA();

// ParseTreeType.MEMBER_LOOKUP_EXPRESSION
x = [[1,2,3]];
var [a] = x[0];
checkA();
[a] = x[0];
checkA();
var [a, b, c] = x[0];
checkAbc();
[a, b, c] = x[0];
checkAbc();


// ParseTreeType.PAREN_EXPRESSION
var [a] = 42 === 42 ? [1] : [42];
checkA();
[a] = 42 === 42 ? [1] : [42];
checkA();

var [a] = null || [1];
checkA();
[a] = null || [1];
checkA();

// ParseTreeType.ARRAY_LITERAL
var [a] = [1, 2, 3];
checkA();
[a] = [1, 2, 3];
checkA();
var [[a]] = [[1], 2, 3];
checkA();
[[a]] = [[1], 2, 3];
checkA();

// ParseTreeType.OBJECT_LITERAL
var {a} = {a: 1, b: 2, c: 3};
checkA();
var {x: {a}} = {x: {a: 1, b: 2}, c: 3};
checkA();

// ParseTreeType.CALL_EXPRESSION
x = function() {
  return [1, 2, 3];
};
var [a, b, c] = x();
checkAbc();
[a, b, c] = x();
checkAbc();

x = function() {
  return {a: 1, b: 2, c: 3};
};
var {a, b, c} = x();
checkAbc();
// ParseTreeType.IDENTIFIER_EXPRESSION

// arrays
x = [1, 2, 3];
var [a] = x;
checkA();
[a] = x;
checkA();

x = [[1], 2, 3];
var [[a]] = x;
checkA();
[[a]] = x;
checkA();

x = [[1, 2, 3]];
var [[a, b, c]] = x;
checkAbc();
[[a, b, c]] = x;
checkAbc();

x = [1, [2, 3]];
var [ a, [b, c] ] = x;
checkAbc();
[ a, [b, c] ] = x;
checkAbc();

x = [[1, 2], 3];
var [[a, b], c] = x;
checkAbc();
[[a, b], c] = x;
checkAbc();

x = [[1], 2, [3]];
var [[a], b, [c]] = x;
checkAbc();
[[a], b, [c]] = x;
checkAbc();

// objects
x = {a: 1, b: 2, c: 3};
var {a, b, c} = x;
checkAbc();

x = {a: 1, b: 2, c: 3};
var {a} = x;
checkA();

x = {a: 1, b: 2, c: 3};
var {a, b, c} = x;
checkAbc();

x = {x: {a: 1, b: 2}, c: 3};
var {x: {a}} = x;
checkA();
