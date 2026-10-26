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

// A function declared in a block is only declared as a `var` of the function
// (Annex B) when its name is not a parameter
function k(l, { ...m }) {
  arguments;
  {
    function l() {}
  }
  return typeof l;
}
expect(k(1, {})).toBe("number");

// A `var` redeclaration keeps the value of the parameter
function n(o, { ...p }) {
  var o;
  arguments;
  return o;
}
expect(n(1, {})).toBe(1);

expect([f.length, g.length, h.length, k.length, n.length]).toEqual([
  2, 3, 2, 2, 2,
]);
