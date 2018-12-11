function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "initializer",
    placement: "own",
  })
  class A {}
}).toThrow(TypeError);
