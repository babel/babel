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
  Foo.prototype.test.whatever();
  Foo.prototype.test.call(this);
};

_inherits(Test, Foo);

Test.test = function () {
  return Foo.wow.call(this);
};
