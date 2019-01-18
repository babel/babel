function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

function get() {}

@pushElement({
  kind: "accessor",
  placement: "static",
  key: "foo",
  enumerable: true,
  configurable: true,
  get: get,
})
class A {}

expect(A.prototype).not.toHaveProperty("foo");
expect(new A()).not.toHaveProperty("foo");

expect(Object.getOwnPropertyDescriptor(A, "foo")).toEqual({
  enumerable: true,
  configurable: true,
  get: get,
});
