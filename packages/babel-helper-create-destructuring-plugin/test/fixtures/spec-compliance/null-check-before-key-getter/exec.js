// RequireObjectCoercible happens before the property name is evaluated.
let read = false;
const a = { get b() { read = true; return "x"; } };
expect(() => {
  const { [a.b]: x } = null;
}).toThrow(TypeError);
expect(read).toBe(false);
