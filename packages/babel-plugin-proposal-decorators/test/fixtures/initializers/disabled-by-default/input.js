function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "initializer",
    placement: "static",
    initializer() {}
  })
  class A {}
}).toThrow(TypeError);
