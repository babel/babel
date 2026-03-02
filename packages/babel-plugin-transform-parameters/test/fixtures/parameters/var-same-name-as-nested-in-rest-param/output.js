function f() {
  for (var _len = arguments.length, _ref = new Array(_len), _key = 0; _key < _len; _key++) {
    _ref[_key] = arguments[_key];
  }
  var x = _ref[0],
    _ref$ = _ref[1],
    y = _ref$ === void 0 ? x : _ref$;
  return x;
}
function g() {
  for (var _len2 = arguments.length, _ref2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    _ref2[_key2] = arguments[_key2];
  }
  var x = _ref2[0],
    _ref2$ = _ref2[1],
    y = _ref2$ === void 0 ? x : _ref2$;
  return function (x) {
    var x = 1;
    return x;
  }(x);
}
