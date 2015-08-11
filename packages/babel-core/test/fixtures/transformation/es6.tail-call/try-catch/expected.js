"use strict";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    return f(n - 1);
  } catch (e) {}
})(1e6) === "foo";

(function f(_x) {
  var _again = true;

  _function: while (_again) {
    var n = _x;
    _again = false;

    if (n <= 0) {
      return "foo";
    }

    try {
      throw new Error();
    } catch (e) {
      _x = n - 1;
      _again = true;
      continue _function;
    }
  }
})(1e6) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    throw new Error();
  } catch (e) {
    return f(n - 1);
  } finally {}
})(1e6) === "foo";

(function f(_x2) {
  var _again2 = true;

  _function2: while (_again2) {
    var n = _x2;
    _again2 = false;

    if (n <= 0) {
      return "foo";
    }

    try {} finally {
      _x2 = n - 1;
      _again2 = true;
      continue _function2;
    }
  }
})(1e6) === "foo";
