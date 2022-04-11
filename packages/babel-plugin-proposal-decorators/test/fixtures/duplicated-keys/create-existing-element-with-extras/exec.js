function decorate(el) {
  el.extras = [{
    kind: "method",
    key: "foo",
    descriptor: {
      enumerable: true,
      configurable: true,
      writable: true,
      value: function() {},
    }
  }];

  return el;
}

expect(() => {
  class A {
    @decorate
    bar() {}

    foo() {}
  }
}).toThrow(TypeError);


