function decorator(el) {
  el.elements = [{
    kind: "hook",
    placement: "own",
    start() {}
  }, {
    kind: "hook",
    placement: "own",
    start() {}
  }];
}

expect(() => {
  @decorator
  class A {}
}).not.toThrow();
