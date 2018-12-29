var el = null;
var val = {};

class A {
  @(_ => el = _)
  #foo = val;
}

expect(el).toEqual(Object.defineProperty({
  kind: "field",
  key: expect.aPrivateName(),
  placement: "own",
  descriptor: {
    enumerable: true,
    configurable: true,
    writable: true,
  },
  initializer: expect.any(Function),
}, Symbol.toStringTag, { value: "Descriptor" }));

expect(el.initializer()).toBe(val);
