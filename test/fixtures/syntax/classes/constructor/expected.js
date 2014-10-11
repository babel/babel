var Test = function () {
  function Test() {
    this.state = "test";
  }
  return Test;
}();

var Foo = function(Bar) {
  function Foo() {
    this.state = "test";
  }

  Foo.prototype = Object.create(Bar.prototype, {
    constructor: {
      value: Foo,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  Foo.__proto__ = Bar;
  return Foo;
}(Bar);
