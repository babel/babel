"use strict";

function skipWhile(_x) {
  var _again = true;

  _function: while (_again) {
    var cond = _x;
    _again = false;

    if (!hasNext() || cond(current, last)) return;
    move();
    _x = cond;
    _again = true;
    continue _function;
  }
}

var skipWhile2 = function skipWhile2(_x2) {
  var _again2 = true;

  _function2: while (_again2) {
    var cond = _x2;
    _again2 = false;

    if (!hasNext() || cond(current, last)) return;
    move();
    _x2 = cond;
    _again2 = true;
    continue _function2;
  }
};
