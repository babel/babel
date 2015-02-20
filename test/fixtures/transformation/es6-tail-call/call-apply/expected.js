"use strict";

(function f(_x) {
  var _this = this,
      _arguments = arguments;

  _function: while (true) {
    var n = _x;

    if (n <= 0) {
      console.log(_this, _arguments);
      return "foo";
    }

    if (Math.random() > 0.5) {
      _arguments = [_x = n - 1];
      continue _function;
    } else {
      _arguments = [_x = n - 1];
      continue _function;
    }return;
  }
})(1000000) === "foo";
