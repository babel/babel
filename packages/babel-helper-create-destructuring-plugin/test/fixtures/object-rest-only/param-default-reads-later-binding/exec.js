// A default reading a binding of the same pattern, initialized after it, is
// in its TDZ like the parameter is natively: the patterns moved into the body
// are declared with `let`, not `var`.
function f({ b = a, a, ...r }) {
  return [b, a, r];
}
expect(() => f({})).toThrow(ReferenceError);
expect(f({ a: 1, b: 2, c: 3 })).toEqual([2, 1, { c: 3 }]);

// The pattern of a rest parameter
function g(...{ b = a, a, ...r }) {
  return [b, a, r];
}
expect(() => g()).toThrow(ReferenceError);
expect(g.length).toBe(0);

// Moved by @babel/plugin-transform-parameters, with the parameters it conflicts with
function h({ ...s }, c = s, ...{ b = a, a, ...r }) {
  return [s, c, b, a, r];
}
expect(() => h({ x: 1 })).toThrow(ReferenceError);
