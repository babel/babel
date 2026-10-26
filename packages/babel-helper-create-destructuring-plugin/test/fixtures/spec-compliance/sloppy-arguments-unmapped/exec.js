// Functions with destructuring parameters have an unmapped `arguments`
// object, even in sloppy mode and once the parameters are lowered to ES5.
function f(b, { ...a }) {
  b = 9;
  return arguments[0];
}
expect(f(1, {})).toBe(1);

function g(c, [d], { ...e }) {
  arguments[0] = "changed";
  return c;
}
expect(g("c", [], {})).toBe("c");

// A function declaration in the body is initialized after the parameters
function h(i, { ...j }) {
  function i() {}
  return [typeof i, typeof arguments[0]];
}
expect(h(1, {})).toEqual(["function", "number"]);

expect([f.length, g.length, h.length]).toEqual([2, 3, 2]);
