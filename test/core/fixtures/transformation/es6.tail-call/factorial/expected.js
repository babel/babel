"use strict";

function fact(_x2) {
  var _arguments = arguments;
  var _again = true;

  _function: while (_again) {
    _again = false;
    var n = _x2;
    acc = undefined;
    var acc = _arguments[1] === undefined ? 1 : _arguments[1];
    if (n > 1) {
      _arguments = [_x2 = n - 1, acc * n];
      _again = true;
      continue _function;
    } else {
      return acc;
    }
  }
}