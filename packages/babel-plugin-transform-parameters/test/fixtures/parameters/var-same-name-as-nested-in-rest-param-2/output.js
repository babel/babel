function f() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var _ref$length = _ref.length,
    x = _ref$length === void 0 ? 0 : _ref$length,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? x : _ref$y;
  return x;
}
function g() {
  for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    _ref2[_key2] = arguments[_key2];
  }
  var _ref2$length = _ref2.length,
    x = _ref2$length === void 0 ? 0 : _ref2$length,
    _ref2$y = _ref2.y,
    y = _ref2$y === void 0 ? x : _ref2$y;
  return function (x) {
    var x = 1;
    return x;
  }(x);
}
