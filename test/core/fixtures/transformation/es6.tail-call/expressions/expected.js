"use strict";

(function f(_x) {
  var _left;

  var _again = true;

  _function: while (_again) {
    var n = _x;
    _again = false;
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
})(1e6, true) === "foo";
