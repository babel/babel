var el = null;
var val = {};

class A {
  @(_ => el = _)
  foo = val;
}

expect(el).toEqual({
  [Symbol.toStringTag]: "Field Descriptor",
  kind: "field",
  key: "foo",
  placement: "own",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
  },
  initializer: expect.any(Function),
});

expect(el.initializer()).toBe(val);
