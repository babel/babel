var Test = function (Foo) {
  function Test() {
    Foo.apply(this, arguments);
  }
  Test.prototype = Object.create(Foo.prototype, {
    constructor: {
      value: Test,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  Test.__proto__ = Foo;
  return Test;
}(Foo);
