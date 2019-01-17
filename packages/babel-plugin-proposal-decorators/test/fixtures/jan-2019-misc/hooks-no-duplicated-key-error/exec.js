function decorator(el) {
  el.elements = [{
    kind: "hook",
    placement: "own",
    initializer() {}
  }, {
    kind: "hook",
    placement: "own",
    initializer() {}
  }];
}

expect(() => {
  @decorator
  class A {}
}).not.toThrow();
