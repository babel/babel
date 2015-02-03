"use strict";

var _slice = Array.prototype.slice;
var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var Test = (function (Foo) {
  function Test() {
    var _Foo$prototype$test, _Foo$prototype$test2;
    _classCallCheck(this, Test);

    woops["super"].test();
    Foo.call(this);
    Foo.prototype.test.call(this);

    Foo.call.apply(Foo, [this].concat(_slice.call(arguments)));
    Foo.call.apply(Foo, [this, "test"].concat(_slice.call(arguments)));

    (_Foo$prototype$test = Foo.prototype.test).call.apply(_Foo$prototype$test, [this].concat(_slice.call(arguments)));
    (_Foo$prototype$test2 = Foo.prototype.test).call.apply(_Foo$prototype$test2, [this, "test"].concat(_slice.call(arguments)));
  }

  _inherits(Test, Foo);

  Test.prototype.test = function test() {
    var _Foo$prototype$test, _Foo$prototype$test2;
    Foo.prototype.test.call(this);
    (_Foo$prototype$test = Foo.prototype.test).call.apply(_Foo$prototype$test, [this].concat(_slice.call(arguments)));
    (_Foo$prototype$test2 = Foo.prototype.test).call.apply(_Foo$prototype$test2, [this, "test"].concat(_slice.call(arguments)));
  };

  Test.foo = function foo() {
    var _Foo$foo, _Foo$foo2;
    Foo.foo.call(this);
    (_Foo$foo = Foo.foo).call.apply(_Foo$foo, [this].concat(_slice.call(arguments)));
    (_Foo$foo2 = Foo.foo).call.apply(_Foo$foo2, [this, "test"].concat(_slice.call(arguments)));
  };

  return Test;
})(Foo);