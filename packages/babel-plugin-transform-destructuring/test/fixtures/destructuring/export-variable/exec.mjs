// `export` is removed: the exec test isn't run as a module.
expect(() => {
  let {a, b, c: {d, e: {f = 4}}} = {};
}).toThrow(TypeError);

let {a, b, c: {d, e: {f = 4}}} = { a: 1, c: { d: 2, e: {} } };
expect(a).toBe(1);
expect(b).toBeUndefined();
expect(d).toBe(2);
expect(f).toBe(4);
