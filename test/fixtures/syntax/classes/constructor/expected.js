"use strict";

var _extends = function (child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  child.__proto__ = parent;
};

var Test = function() {
  var Test = function Test() {
    this.state = "test";
  };

  return Test;
}();

var Foo = function(Bar) {
  var Foo = function Foo() {
    this.state = "test";
  };

  _extends(Foo, Bar);

  return Foo;
}(Bar);
