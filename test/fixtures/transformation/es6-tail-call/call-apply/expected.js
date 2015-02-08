"use strict";

(function f(n) {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  var _callee = function (n) {
    if (n <= 0) {
      console.log(this, arguments);
      return "foo";
    }
    if (Math.random() > 0.5) {
      _arguments = [n - 1];
      _this = this;
      return _shouldContinue = true;
    } else {
      _arguments = [n - 1];
      _this = this;
      return _shouldContinue = true;
    }
  };

  do {
    _shouldContinue = false;
    _result = _callee.apply(_this, _arguments);
  } while (_shouldContinue);
  return _result;
})(1000000) === "foo";