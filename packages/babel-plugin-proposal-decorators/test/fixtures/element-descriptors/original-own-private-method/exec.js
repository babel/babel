debugger;

var el = null;

class A {
  @(_ => el = _)
  #foo() {}
}

expect(el).toEqual(Object.defineProperty({
  kind: "method",
  key: expect.aPrivateName(),
  placement: "own",
  descriptor: {
    enumerable: false,
    configurable: true,
    writable: true,
    value: expect.any(Function),
  },
}, Symbol.toStringTag, { value: "Descriptor" }));
