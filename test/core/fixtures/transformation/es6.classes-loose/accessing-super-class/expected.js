"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    woops["super"].test();
    _Foo.call(this);
    _Foo.prototype.test.call(this);

    _Foo.apply(this, babelHelpers.slice.call(arguments));
    _Foo.apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));

    _Foo.prototype.test.apply(this, babelHelpers.slice.call(arguments));
    _Foo.prototype.test.apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
  }

  babelHelpers.inherits(Test, _Foo);

  Test.prototype.test = function test() {
    _Foo.prototype.test.call(this);
    _Foo.prototype.test.apply(this, babelHelpers.slice.call(arguments));
    _Foo.prototype.test.apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
  };

  Test.foo = function foo() {
    _Foo.foo.call(this);
    _Foo.foo.apply(this, babelHelpers.slice.call(arguments));
    _Foo.foo.apply(this, ["test"].concat(babelHelpers.slice.call(arguments)));
  };

  return Test;
})(Foo);