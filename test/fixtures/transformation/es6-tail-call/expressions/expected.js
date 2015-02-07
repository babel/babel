"use strict";

(function f(n) {
  var _temp;
  if (n <= 0) {
    return "foo";
  } else {
    doSmth();

    if (!(_temp = getTrueValue())) {
      return _temp;
    }
    if (_temp = getFalseValue()) {
      return _temp;
    }
    return to5Runtime.tailCall(f, [n - 1]);
  }
})(1000000, true) === "foo";
