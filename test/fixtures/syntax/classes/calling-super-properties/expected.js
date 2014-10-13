var Test = function(Foo) {
  var Test = function Test() {
    Foo.prototype.test.whatever();
    Foo.prototype.test.call(this);
  };
  Test.prototype = Object.create(Foo.prototype, {
    constructor: {
      value: Test,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  Test.__proto__ = Foo;
  Object.defineProperties(Test, {
    test: {
      writable: true,

      value: function() {
        return Foo.wow.call(this);
      }
    }
  });
  return Test;
}(Foo);
