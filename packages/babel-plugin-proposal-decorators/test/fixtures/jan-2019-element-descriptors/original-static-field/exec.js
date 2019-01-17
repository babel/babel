var el = null;
var val = { foo: 2 };

class A {
  @(_ => el = _)
  static foo = val;
}

expect(el).toEqual(Object.defineProperty({
  kind: "field",
  key: "foo",
  placement: "static",
  enumerable: true,
  configurable: true,
  writable: true,
  initialize: expect.any(Function),
}, Symbol.toStringTag, { value: "Descriptor" }));

expect(el.initialize()).toBe(val);
