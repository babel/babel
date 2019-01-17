var el = null;

class A {
  @(_ => el = _)
  foo;
}

expect(el).toEqual(Object.defineProperty({
  kind: "field",
  key: "foo",
  placement: "own",
  enumerable: true,
  configurable: true,
  writable: true,
  initialize: undefined,
}, Symbol.toStringTag, { value: "Descriptor" }));
