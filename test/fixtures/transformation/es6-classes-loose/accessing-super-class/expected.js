"use strict";

var Test = (function (Foo) {
  function Test() {
    var _Foo$prototype$test, _Foo$prototype$test2;

    babelHelpers.classCallCheck(this, Test);

    woops["super"].test();
    Foo.call(this);
    Foo.prototype.test.call(this);

    Foo.call.apply(Foo, [this].concat(babelHelpers.slice.call(arguments)));
    Foo.call.apply(Foo, [this, "test"].concat(babelHelpers.slice.call(arguments)));

    (_Foo$prototype$test = Foo.prototype.test).call.apply(_Foo$prototype$test, [this].concat(babelHelpers.slice.call(arguments)));
    (_Foo$prototype$test2 = Foo.prototype.test).call.apply(_Foo$prototype$test2, [this, "test"].concat(babelHelpers.slice.call(arguments)));
  }

  babelHelpers.inherits(Test, Foo);

  Test.prototype.test = function test() {
    var _Foo$prototype$test, _Foo$prototype$test2;

    Foo.prototype.test.call(this);
    (_Foo$prototype$test = Foo.prototype.test).call.apply(_Foo$prototype$test, [this].concat(babelHelpers.slice.call(arguments)));
    (_Foo$prototype$test2 = Foo.prototype.test).call.apply(_Foo$prototype$test2, [this, "test"].concat(babelHelpers.slice.call(arguments)));
  };

  Test.foo = function foo() {
    var _Foo$foo, _Foo$foo2;

    Foo.foo.call(this);
    (_Foo$foo = Foo.foo).call.apply(_Foo$foo, [this].concat(babelHelpers.slice.call(arguments)));
    (_Foo$foo2 = Foo.foo).call.apply(_Foo$foo2, [this, "test"].concat(babelHelpers.slice.call(arguments)));
  };

  return Test;
})(Foo);