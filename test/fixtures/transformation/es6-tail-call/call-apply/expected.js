"use strict";

(function f(_x) {
  var _this = this,
      _arguments = arguments;

  var _again = true;

  _function: while (_again) {
    _again = false;
    var n = _x;

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
})(1000000) === "foo";
