"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

var _inherits = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof parent);
  }
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

var Test = (function (Foo) {
  var Test = function Test() {
    Foo.prototype.test.whatever();
    Foo.prototype.test.call(this);
  };

  _inherits(Test, Foo);

  _prototypeProperties(Test, {
    test: {
      value: function () {
        return Foo.wow.call(this);
      },
      writable: true,
      enumerable: true,
      configurable: true
    }
  });

  return Test;
})(Foo);
