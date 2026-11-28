// Functions with default, rest or destructuring parameters have an unmapped
// `arguments` object, even in sloppy mode.
function f(b, { a }) {
  b = 9;
  return arguments[0];
}
expect(f(1, {})).toBe(1);

function g(b, c = 1) {
  arguments[0] = 9;
  return b;
}
expect(g(1)).toBe(1);

function h(b, ...r) {
  b = 9;
  return [arguments[0], r];
}
expect(h(1, 2)).toEqual([1, [2]]);

function k(b, c = (arguments[0] = 9)) {
  return b;
}
expect(k(1)).toBe(1);

// A function declared in a block is only declared as a `var` of the function
// (Annex B) when its name is not a parameter
function p(b, { a }) {
  arguments;
  {
    function b() {}
  }
  return typeof b;
}
expect(p(1, {})).toBe("number");

// Reading `arguments` only observes the mapping if a parameter is assigned
function q(a, b = 1) {
  return [arguments.length, arguments[0]];
}
expect(q(5)).toEqual([1, 5]);

expect([f.length, g.length, h.length, k.length, p.length, q.length]).toEqual([
  2, 1, 1, 1, 2, 1,
]);
