"use strict";

(function f() {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  do {
    _shouldContinue = false;
    _result = (function (n, /* should be undefined after first pass */m) {
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
