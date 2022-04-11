function decorate() {
  return {
    kind: "method",
    key: "foo",
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function() {},
    }
  };
}

expect(() => {
  class A {
    @decorate
    bar() {}

    foo() {}
  }
}).toThrow(TypeError);


