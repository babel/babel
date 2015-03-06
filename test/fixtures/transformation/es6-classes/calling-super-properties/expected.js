"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "constructor", this).call(this);
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).whatever();
    babelHelpers.get(Object.getPrototypeOf(_Test.prototype), "test", this).call(this);
  };

  babelHelpers.inherits(_Test, _Foo);
  babelHelpers.createClass(_Test, null, {
    test: {
      value: function test() {
        return babelHelpers.get(Object.getPrototypeOf(_Test), "wow", this).call(this);
      }
    }
  });
  return _Test;
})(Foo);