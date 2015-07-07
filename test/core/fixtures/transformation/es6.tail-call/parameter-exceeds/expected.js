"use strict";

function foo(a, b) {
  if (b) {
    return foo(b);
  } else {
    return a;
  }
}

function foo(_x, _x2) {
  var _again = true;

  _function: while (_again) {
    var a = _x,
        b = _x2;
    _again = false;

    if (b) {
      _x = "a";
      _x2 = "b";
      _again = true;
      continue _function;
    } else {
      return a;
    }
  }
}
