"use strict";

(function f(n) {
  if (n <= 0) {
    return "foo";
  }
  try {
    return f(n - 1);
  } catch (e) {}
})(1000000) === "foo";

(function f() {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  do {
    _shouldContinue = false;
    _result = (function (n) {
      if (n <= 0) {
        return "foo";
      }
      try {
        throw new Error();
      } catch (e) {
        _arguments = [n - 1];
        _this = undefined;
        return _shouldContinue = true;
      }
    }).apply(_this, _arguments);
  } while (_shouldContinue);
  return _result;
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

(function f() {
  var _arguments = arguments,
      _this = this,
      _shouldContinue,
      _result;
  do {
    _shouldContinue = false;
    _result = (function (n) {
      if (n <= 0) {
        return "foo";
      }
      try {} finally {
        _arguments = [n - 1];
        _this = undefined;
        return _shouldContinue = true;
      }
    }).apply(_this, _arguments);
  } while (_shouldContinue);
  return _result;
})(1000000) === "foo";
