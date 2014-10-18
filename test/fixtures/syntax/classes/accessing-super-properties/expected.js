"use strict";

var Test = function(Foo) {
  var Test = function Test() {
    Foo.prototype.test;
    Foo.prototype.test.whatever;
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
  return Test;
}(Foo);