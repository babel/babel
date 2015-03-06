"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this);
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).whatever;
  };

  babelHelpers.inherits(_Test, _Foo);
  return _Test;
})(Foo);