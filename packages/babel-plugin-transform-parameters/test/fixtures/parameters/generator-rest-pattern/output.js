function f(a) {
  for (var _len = arguments.length, _ref = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    _ref[_key - 1] = arguments[_key];
  }
  var b = _ref[0],
    c = _ref[1].c;
  return function* () {
    yield [a, b, c];
  }();
}
