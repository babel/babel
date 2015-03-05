"use strict";

var Test = (function (Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    if (Foo != null) {
      Foo.apply(this, arguments);
    }
  }

  babelHelpers.inherits(Test, Foo);
  return Test;
})(Foo);