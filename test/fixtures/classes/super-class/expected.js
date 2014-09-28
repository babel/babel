var Test = function (Foo) {
  function Test() {
  }
  Test.prototype = Object.create(Foo.prototype, {
    constructor: {
      value: Test,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  return Test;
}(Foo);
