var el = null;

class A {
  @(_ => el = _)
  static #foo() {}
}

expect(el).toEqual(Object.defineProperty({
  kind: "method",
  key: expect.any(Object),
  placement: "static",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
    value: A.foo,
  },
}, Symbol.toStringTag, { value: "Descriptor" }));

assertPrivateName(el.key);
