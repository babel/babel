// transform-parameters must not map `arguments` again
function f(b, { ...a }) {
  b = 9;
  return arguments[0];
}
expect(f(1, {})).toBe(1);
expect(f.length).toBe(2);
