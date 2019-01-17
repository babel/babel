function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "hook",
    placement: "own",
    writable: true,
    start() {}
  })
  class A {}
}).toThrow(TypeError);
