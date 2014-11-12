"use strict";

var _classProps = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);

  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

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

var Test = (function (Foo) {
  var Test = function Test() {
    woops.super.test();
    Foo.call(this);
    Foo.prototype.test.call(this);
    foob(Foo);

    Foo.call.apply(Foo, [this].concat(Array.from(arguments)));
    Foo.call.apply(Foo, [this, "test"].concat(Array.from(arguments)));

    Foo.prototype.test.call.apply(Foo.prototype, [this].concat(Array.from(arguments)));
    Foo.prototype.test.call.apply(Foo.prototype, [this, "test"].concat(Array.from(arguments)));
  };

  _extends(Test, Foo);

  _classProps(Test, {
    foo: {
      writable: true,
      value: function () {
        Foo.foo.call(this);
        Foo.foo.call.apply(Foo.foo, [this].concat(Array.from(arguments)));
        Foo.foo.call.apply(Foo.foo, [this, "test"].concat(Array.from(arguments)));
      }
    }
  }, {
    test: {
      writable: true,
      value: function () {
        Foo.prototype.test.call(this);
        Foo.prototype.test.call.apply(Foo.prototype.test, [this].concat(Array.from(arguments)));
        Foo.prototype.test.call.apply(Foo.prototype.test, [this, "test"].concat(Array.from(arguments)));
      }
    }
  });

  return Test;
})(Foo);
