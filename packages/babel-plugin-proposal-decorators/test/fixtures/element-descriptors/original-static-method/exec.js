var el = null;

class A {
  @(_ => el = _)
  static foo() {}
}

expect(el).toEqual({
  [Symbol.toStringTag]: "Descriptor",
  kind: "method",
  key: "foo",
  placement: "static",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
    value: A.foo,
  },
});
