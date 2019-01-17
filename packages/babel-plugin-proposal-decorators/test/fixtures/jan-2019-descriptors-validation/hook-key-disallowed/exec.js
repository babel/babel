function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "hook",
    key: "foo",
    placement: "own",
    initializer() {}
  })
  class A {}
}).toThrow(TypeError);
