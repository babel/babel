function decorator(el) {
  el.elements = [{
    kind: "initializer",
    placement: "own",
    initializer() {}
  }, {
    kind: "initializer",
    placement: "own",
    initializer() {}
  }];
}

expect(() => {
  @decorator
  class A {}
}).not.toThrow();
