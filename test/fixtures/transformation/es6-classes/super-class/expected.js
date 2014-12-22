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
  if (Foo) {
    Foo.apply(this, arguments);
  }
};

_inherits(Test, Foo);
