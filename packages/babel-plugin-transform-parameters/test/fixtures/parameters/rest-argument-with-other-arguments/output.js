function func(a, b) {
  for (var _len = arguments.length, _arguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    _arguments[_key - 2] = arguments[_key];
  }
  return [a, b, _arguments];
}
func('a', 'b', 1, 2, 3);
