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
  var _Foo = Foo;
  var Test = function Test() {
    var _Foo$prototype$test, _Foo$prototype$test2;
    woops["super"].test();
    _Foo.call(this);
    _Foo.prototype.test.call(this);
    foob(_Foo);

    _Foo.call.apply(_Foo, [this].concat(_slice.call(arguments)));
    _Foo.call.apply(_Foo, [this, "test"].concat(_slice.call(arguments)));

    (_Foo$prototype$test = _Foo.prototype.test).call.apply(_Foo$prototype$test, [this].concat(_slice.call(arguments)));
    (_Foo$prototype$test2 = _Foo.prototype.test).call.apply(_Foo$prototype$test2, [this, "test"].concat(_slice.call(arguments)));
  };

  _inherits(Test, _Foo);

  Test.prototype.test = function () {
    var _Foo$prototype$test3, _Foo$prototype$test4;
    _Foo.prototype.test.call(this);
    (_Foo$prototype$test3 = _Foo.prototype.test).call.apply(_Foo$prototype$test3, [this].concat(_slice.call(arguments)));
    (_Foo$prototype$test4 = _Foo.prototype.test).call.apply(_Foo$prototype$test4, [this, "test"].concat(_slice.call(arguments)));
  };

  Test.foo = function () {
    var _Foo$foo, _Foo$foo2;
    _Foo.foo.call(this);
    (_Foo$foo = _Foo.foo).call.apply(_Foo$foo, [this].concat(_slice.call(arguments)));
    (_Foo$foo2 = _Foo.foo).call.apply(_Foo$foo2, [this, "test"].concat(_slice.call(arguments)));
  };

  return Test;
})();
