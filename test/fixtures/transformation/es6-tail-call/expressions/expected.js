"use strict";

(function f(n) {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  do {
    _shouldContinue = false;
    _result = (function (n) {
      var _left;
      if (n <= 0) {
        return "foo";
      } else {
        doSmth();

        if (!(_left = getTrueValue())) {
          return _left;
        }
        if (_left = getFalseValue()) {
          return _left;
        }
        _arguments = [n - 1];
        _this = undefined;
        return _shouldContinue = true;
      }
    }).apply(_this, _arguments);
  } while (_shouldContinue);
  return _result;
})(1000000, true) === "foo";
