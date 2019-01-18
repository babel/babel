function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "hook",
    placement: "own",
    replace() {}
  })
  class A {}

  new A();
}).toThrow(TypeError);
