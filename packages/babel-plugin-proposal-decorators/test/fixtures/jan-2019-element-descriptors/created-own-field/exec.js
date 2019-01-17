function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

var value = {};

@pushElement({
  kind: "field",
  placement: "own",
  key: "foo",
  enumerable: true,
  configurable: true,
  writable: true,
  initializer() {
    return value;
  }
})
class A {}

expect(A).not.toHaveProperty("foo");
expect(A.prototype).not.toHaveProperty("foo");

expect(Object.getOwnPropertyDescriptor(new A(), "foo")).toEqual({
  enumerable: true,
  configurable: true,
  writable: true,
  value: value,
});
