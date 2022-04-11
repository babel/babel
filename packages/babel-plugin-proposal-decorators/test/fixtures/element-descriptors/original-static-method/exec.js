var el = null;

class A {
  @(_ => el = _)
  static foo() {}
}

expect(el).toEqual(Object.defineProperty({
  kind: "method",
  key: "foo",
  placement: "static",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
    value: A.foo,
  },
}, Symbol.toStringTag, { value: "Descriptor" }));
