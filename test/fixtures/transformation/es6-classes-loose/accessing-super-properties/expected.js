"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    _Foo.call(this);
    _Foo.prototype.test;
    _Foo.prototype.test.whatever;
  };

  babelHelpers.inherits(_Test, _Foo);
  return _Test;
})(Foo);