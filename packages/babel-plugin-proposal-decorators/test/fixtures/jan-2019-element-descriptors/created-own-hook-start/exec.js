function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

var self;

@pushElement({
  kind: "hook",
  placement: "own",
  start() {
    self = this;
  }
})
class A {}

new A();

expect(self).toBeInstanceOf(A);
expect(new A()).not.toHaveProperty("undefined");
