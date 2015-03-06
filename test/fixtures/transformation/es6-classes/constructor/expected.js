"use strict";

var Test = (function () {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    this.state = "test";
  };

  return _Test;
})();

var Foo = (function (_Bar) {
  var _Foo = function Foo() {
    babelHelpers.classCallCheck(this, _Foo);

    babelHelpers.get(Object.getPrototypeOf(_Foo.prototype), "constructor", this).call(this);
    this.state = "test";
  };

  babelHelpers.inherits(_Foo, _Bar);
  return _Foo;
})(Bar);