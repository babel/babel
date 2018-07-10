var el = null;
var val = { foo: 2 };

class A {
  @(_ => el = _)
  static foo = val;
}

expect(el).toEqual({
  [Symbol.toStringTag]: "Descriptor",
  kind: "field",
  key: "foo",
  placement: "static",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
  },
  initializer: expect.any(Function),
});

expect(el.initializer()).toBe(val);
