"use strict";

var Test = (function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    _Foo.call(this);
    _Foo.prototype.test;
    _Foo.prototype.test.whatever;
  }

  return Test;
})(Foo);
