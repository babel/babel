// Functions with destructuring parameters have an unmapped `arguments`
// object, even in sloppy mode.
function f({ ...a }, b) {
  b = 2;
  return [arguments[1], b];
}
expect(f({}, 1)).toEqual([1, 2]);

function g(c, { ...d }) {
  arguments[0] = "changed";
  return (() => [c, arguments.length])();
}
expect(g("c", {})).toEqual(["c", 2]);
expect([f.length, g.length]).toEqual([2, 2]);

// Without `arguments`, the parameter list is left as is
function h({ ...e }, i) {
  return i;
}
expect(h({}, 3)).toBe(3);
