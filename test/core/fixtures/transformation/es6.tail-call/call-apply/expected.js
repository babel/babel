"use strict";

(function f(_x) {
  var _this = this,
      _arguments = arguments;

  var _again = true;

  _function: while (_again) {
    var n = _x;
    _again = false;

    if (n <= 0) {
      console.log(_this, _arguments);
      return "foo";
    }

    if (Math.random() > 0.5) {
      _arguments = [_x = n - 1];
      _again = true;
      continue _function;
    } else {
      _arguments = [_x = n - 1];
      _again = true;
      continue _function;
    }
  }
})(1e6) === "foo";
