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

var Test = (function () {
  var _TestSuper = Foo;
  var Test = function Test() {
    _TestSuper.prototype.test.whatever();
    _TestSuper.prototype.test.call(this);
  };

  _inherits(Test, _TestSuper);

  Test.test = function () {
    return _TestSuper.wow.call(this);
  };

  return Test;
})();
