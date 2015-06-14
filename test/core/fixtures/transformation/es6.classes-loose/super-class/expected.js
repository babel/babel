"use strict";

var Test = (function (_Foo) {
  function Test() {
    babelHelpers.classCallCheck(this, Test);

    _Foo.call.apply(_Foo, [this].concat(babelHelpers.slice.call(arguments)));
  }

  babelHelpers.inherits(Test, _Foo);
  return Test;
})(Foo);