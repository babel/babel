function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

function get() {}
function set() {}

@pushElement({
  kind: "accessor",
  placement: "own",
  key: "foo",
  enumerable: true,
  configurable: true,
  set: set,
})
class A {}

expect(A).not.toHaveProperty("foo");
expect(A.prototype).not.toHaveProperty("foo");

expect(Object.getOwnPropertyDescriptor(new A(), "foo")).toEqual({
  enumerable: true,
  configurable: true,
  set: set,
});
