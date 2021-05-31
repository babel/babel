function decorate(el) {
  return {
    kind: "method",
    key: "foo",
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function() {},
    },
    extras: [{
      kind: "method",
      key: "foo",
      descriptor: {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function() {},
      }
    }]
  };
}

expect(() => {
  class A {
    @decorate
    method() {}
  }
}).toThrow(TypeError);


