var el = null;

class A {
  @(_ => el = _)
  foo() {}
}

expect(el).toEqual(Object.defineProperty({
  kind: "method",
  key: "foo",
  placement: "prototype",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
    value: A.prototype.foo,
  },
}, Symbol.toStringTag, { value: "Descriptor" }));
