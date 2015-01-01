"use strict";

var _inherits = function (child, parent) {
  child.prototype = Object.create(parent && parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (parent) child.__proto__ = parent;
};

var Test = function Test() {
  this.state = "test";
};

var Foo = (function () {
  var _Bar = Bar;
  var Foo = function Foo() {
    this.state = "test";
  };

  _inherits(Foo, _Bar);

  return Foo;
})();
