var d;

// The function returns its bindings so they can be checked.
const {
  a = ({ ...rest }) => {
    let { ...b } = {};
    return [rest, b];
  },
  c = ({ ...d } = {}),
} = {};

expect(typeof a).toBe("function");
expect(a.name).toBe("a");
expect(a.length).toBe(1);
var arg = { x: 1 };
var [rest, b] = a(arg);
expect(rest).toEqual({ x: 1 });
expect(rest).not.toBe(arg);
expect(b).toEqual({});
expect(() => a(null)).toThrow(TypeError);

expect(c).toEqual({});
expect(d).toEqual({});
expect(d).not.toBe(c);
