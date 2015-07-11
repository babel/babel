"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    _Foo.call(this);
    _Foo.prototype.test.whatever();
    _Foo.prototype.test.call(this);
  }

  babelHelpers.inherits(Test, _Foo);

  Test.test = function test() {
    return _Foo.wow.call(this);
  };

  return Test;
})(Foo);