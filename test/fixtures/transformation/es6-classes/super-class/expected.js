"use strict";

var _extends = function (child, parent) {
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
  Foo.apply(this, arguments);
};

_extends(Test, Foo);
