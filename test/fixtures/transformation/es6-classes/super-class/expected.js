"use strict";

var Test = (function (_Foo) {
  var _Test = function Test() {
    babelHelpers.classCallCheck(this, _Test);

    if (_Foo != null) {
      _Foo.apply(this, arguments);
    }
  };

  babelHelpers.inherits(_Test, _Foo);
  return _Test;
})(Foo);