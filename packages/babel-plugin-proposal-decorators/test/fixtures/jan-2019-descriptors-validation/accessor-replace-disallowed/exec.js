function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "accessor",
    placement: "static",
    get() {},
    initialize() {}
  })
  class A {}
}).toThrow(TypeError);
