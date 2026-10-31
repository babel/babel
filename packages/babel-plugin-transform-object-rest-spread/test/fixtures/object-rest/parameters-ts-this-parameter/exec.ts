// The `this: Foo` parameter is removed, since the fixture doesn't strip types.
function f({ ...a }, b = a, ...rest) {
  return rest[0];
}

expect(f({ x: 1 })).toBeUndefined();
expect(f({ x: 1 }, "b")).toBeUndefined();
expect(f({ x: 1 }, "b", "rest0", "rest1")).toBe("rest0");
expect(f.call({ thisValue: true }, {}, undefined, "rest0")).toBe("rest0");
expect(f.length).toBe(1);
expect(() => f(null, "b", "rest0")).toThrow(TypeError);
expect(() => f()).toThrow(TypeError);
