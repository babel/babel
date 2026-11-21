// Skipping the read of `unused` must not skip RequireObjectCoercible.
function f({ unused, ...rest }) {
  return rest;
}
expect(() => f(null)).toThrow(TypeError);
expect(f({ unused: 1, a: 2 })).toEqual({ a: 2 });
