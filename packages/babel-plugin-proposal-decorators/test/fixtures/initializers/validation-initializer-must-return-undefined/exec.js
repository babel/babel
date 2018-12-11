function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "initializer",
    placement: "own",
    initializer() {
      return 2;
    }
  })
  class A {}

  new A();
}).toThrow(TypeError);
