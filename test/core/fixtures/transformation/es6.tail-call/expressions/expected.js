"use strict";

(function f(_x) {
  var _left;

  var _again = true;

  _function: while (_again) {
    _again = false;
    var n = _x;
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

      _x = n - 1;
      _again = true;
      continue _function;
    }
  }
})(1000000, true) === "foo";