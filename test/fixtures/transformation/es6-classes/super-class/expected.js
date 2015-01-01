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
    if (_TestSuper) {
      _TestSuper.apply(this, arguments);
    }
  };

  _inherits(Test, _TestSuper);

  return Test;
})();
