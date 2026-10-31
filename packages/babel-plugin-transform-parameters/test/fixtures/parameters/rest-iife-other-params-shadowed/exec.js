// A function redeclaring the rest parameter moves the body into an IIFE,
// which is also passed the other parameters redeclared in the body.
function f(q, ...r) {
  function r() {}
  var q;
  return [q, typeof r];
}
expect(f(2)).toEqual([2, "function"]);

function g(q, w, ...r) {
  function r() {}
  var w = 4;
  return [q, w, typeof r];
}
expect(g(1, 2, 3)).toEqual([1, 4, "function"]);

function h(q, ...r) {
  function r() {}
  try {
    throw 1;
  } catch (q) {
    var q = 3;
  }
  return q;
}
expect(h(2)).toBe(2);
