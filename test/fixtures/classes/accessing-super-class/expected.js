var Test = function (Foo) {
  function Test() {
    woops.super.test();
    Foo.call(this);
    Foo.prototype.test.call(this);
    foob(Foo);
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
