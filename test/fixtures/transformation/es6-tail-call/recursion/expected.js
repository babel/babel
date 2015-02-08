"use strict";

(function f(_x, /* should be undefined after first pass */m) {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  do {
    _shouldContinue = false;
    _result = (function (_x, m) {
      var n = arguments[0] === undefined ? getDefaultValue() : arguments[0];
      if (n <= 0) {
        return "foo";
      }
      // Should be clean (undefined) on each pass
      var local;
      _arguments = [n - 1];
      _this = undefined;
      return _shouldContinue = true;
    }).apply(_this, _arguments);
  } while (_shouldContinue);
  return _result;
})(1000000, true) === "foo";
