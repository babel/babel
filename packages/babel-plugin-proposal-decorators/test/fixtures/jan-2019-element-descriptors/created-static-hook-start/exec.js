function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

var self;

@pushElement({
  kind: "hook",
  placement: "static",
  start() {
    self = this;
  }
})
class A {}

expect(self).toBe(A);
expect(A).not.toHaveProperty("undefined");
