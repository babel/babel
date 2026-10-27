var x = "outer";
function f() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var _ref$ = _ref[0],
    a = _ref$ === void 0 ? babelHelpers.setFunctionName(function () {
      return x;
    }, "a") : _ref$;
  return function () {
    var x = "inner";
    return a();
  }();
}
function g() {
  for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    _ref2[_key2] = arguments[_key2];
  }
  var _ref2$ = _ref2[0],
    a = _ref2$ === void 0 ? babelHelpers.setFunctionName(function () {
      return h;
    }, "a") : _ref2$;
  return function () {
    function h() {}
    return a();
  }();
}
function k() {
  for (var _len3 = arguments.length, _ref3 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    _ref3[_key3] = arguments[_key3];
  }
  var _ref3$ = _ref3[0],
    a = _ref3$ === void 0 ? babelHelpers.setFunctionName(function () {
      return x;
    }, "a") : _ref3$;
  return function () {
    var x = "inner";
    return a();
  }();
}
