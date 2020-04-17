function pushElement(e) {
  return function (c) { c.elements.push(e); return c };
}

expect(() => {
  @pushElement({
    kind: "method",
    key: "foo",
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function() {},
    }
  })
  class A {
    foo() {}
  }
}).toThrow(TypeError);


