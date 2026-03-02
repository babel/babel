function func() {
  for (var _len = arguments.length, _arguments = new Array(_len), _key = 0; _key < _len; _key++) {
    _arguments[_key] = arguments[_key];
  }
  console.log(_arguments); // [1, 2, 3]
}
func(1, 2, 3);
