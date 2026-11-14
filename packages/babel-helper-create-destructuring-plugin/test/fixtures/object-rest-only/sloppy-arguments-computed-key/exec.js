// The computed keys of methods are evaluated in the enclosing function, which
// has an unmapped `arguments` object
function f(a, { ...r }) {
  a = 2;
  return { [arguments[0]]() {} };
}
expect(Object.keys(f(1, {}))).toEqual(["1"]);

function g(a, { ...r }) {
  a = 2;
  return class { static [arguments[0]]() {} };
}
expect(Object.hasOwn(g(1, {}), "1")).toBe(true);
