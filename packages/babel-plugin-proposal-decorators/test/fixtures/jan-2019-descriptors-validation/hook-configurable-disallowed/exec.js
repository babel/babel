function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "hook",
    placement: "own",
    configurable: true,
    initializer() {}
  })
  class A {}
}).toThrow(TypeError);
