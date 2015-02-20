"use strict";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    return f(n - 1);
  } catch (e) {}
})(1000000) === "foo";

(function f(_x) {
  _function: while (true) {
    var n = _x;

    if (n <= 0) {
      return "foo";
    }

    try {
      throw new Error();
    } catch (e) {
      _x = n - 1;
      continue _function;
    }
    return;
  }
})(1000000) === "foo";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }

  try {
    throw new Error();
  } catch (e) {
    return f(n - 1);
  } finally {}
})(1000000) === "foo";

(function f(_x) {
  _function: while (true) {
    var n = _x;

    if (n <= 0) {
      return "foo";
    }

    try {} finally {
      _x = n - 1;
      continue _function;
    }
    return;
  }
})(1000000) === "foo";
