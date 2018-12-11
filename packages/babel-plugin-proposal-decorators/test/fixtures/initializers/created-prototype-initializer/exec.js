function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

var self;

@pushElement({
  kind: "initializer",
  placement: "prototype",
  initializer() {
    self = this;
  }
})
class A {}

expect(self).toBe(A.prototype);
expect(A.prototype).not.toHaveProperty("undefined");
