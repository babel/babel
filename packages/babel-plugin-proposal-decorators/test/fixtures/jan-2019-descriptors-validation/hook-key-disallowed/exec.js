function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "hook",
    key: "foo",
    placement: "own",
    start() {}
  })
  class A {}
}).toThrow(TypeError);
