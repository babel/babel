"use strict";

var Test = (function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    babelHelpers.classCallCheck(this, Test);

    _Foo.apply(this, arguments);
  }

  return Test;
})(Foo);
