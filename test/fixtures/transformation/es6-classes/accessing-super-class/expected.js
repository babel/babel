"use strict";

var _slice = Array.prototype.slice;
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
    woops["super"].test();
    _TestSuper.call(this);
    _TestSuper.prototype.test.call(this);
    foob(_TestSuper);

    _TestSuper.call.apply(_TestSuper, [this].concat(_slice.call(arguments)));
    _TestSuper.call.apply(_TestSuper, [this, "test"].concat(_slice.call(arguments)));

    _TestSuper.prototype.test.call.apply(_TestSuper.prototype, [this].concat(_slice.call(arguments)));
    _TestSuper.prototype.test.call.apply(_TestSuper.prototype, [this, "test"].concat(_slice.call(arguments)));
  };

  _inherits(Test, _TestSuper);

  Test.prototype.test = function () {
    _TestSuper.prototype.test.call(this);
    _TestSuper.prototype.test.call.apply(_TestSuper.prototype.test, [this].concat(_slice.call(arguments)));
    _TestSuper.prototype.test.call.apply(_TestSuper.prototype.test, [this, "test"].concat(_slice.call(arguments)));
  };

  Test.foo = function () {
    _TestSuper.foo.call(this);
    _TestSuper.foo.call.apply(_TestSuper.foo, [this].concat(_slice.call(arguments)));
    _TestSuper.foo.call.apply(_TestSuper.foo, [this, "test"].concat(_slice.call(arguments)));
  };

  return Test;
})();
