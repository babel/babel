var el = null;

class A {
  @(_ => el = _)
  foo;
}

expect(el).toEqual(Object.defineProperty({
  kind: "field",
  key: "foo",
  placement: "own",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
  },
  initializer: undefined,
}, Symbol.toStringTag, { value: "Descriptor" }));
