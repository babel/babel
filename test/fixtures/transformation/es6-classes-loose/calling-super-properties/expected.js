"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    _Foo.call(this);
    _Foo.prototype.test.whatever();
    _Foo.prototype.test.call(this);
  };

  babelHelpers.inherits(_Test, _Foo);

  _Test.test = function test() {
    return _Foo.wow.call(this);
  };

  return _Test;
})(Foo);