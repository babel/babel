"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    if (_Foo != null) {
      _Foo.apply(this, arguments);
    }
  }

  babelHelpers.inherits(Test, _Foo);
  return Test;
})(Foo);