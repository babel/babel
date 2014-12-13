"use strict";

var _slice = Array.prototype.slice;
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

var Test = function Test() {
  woops["super"].test();
  Foo.call(this);
  Foo.prototype.test.call(this);
  foob(Foo);

  Foo.call.apply(Foo, [this].concat(_slice.call(arguments)));
  Foo.call.apply(Foo, [this, "test"].concat(_slice.call(arguments)));

  Foo.prototype.test.call.apply(Foo.prototype, [this].concat(_slice.call(arguments)));
  Foo.prototype.test.call.apply(Foo.prototype, [this, "test"].concat(_slice.call(arguments)));
};

_extends(Test, Foo);

Test.prototype.test = function () {
  Foo.prototype.test.call(this);
  Foo.prototype.test.call.apply(Foo.prototype.test, [this].concat(_slice.call(arguments)));
  Foo.prototype.test.call.apply(Foo.prototype.test, [this, "test"].concat(_slice.call(arguments)));
};

Test.foo = function () {
  Foo.foo.call(this);
  Foo.foo.call.apply(Foo.foo, [this].concat(_slice.call(arguments)));
  Foo.foo.call.apply(Foo.foo, [this, "test"].concat(_slice.call(arguments)));
};
