function func(a, b) {
  for (var _args = arguments, _len = _args.length, arguments = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    arguments[_key - 2] = _args[_key];
  }

  return [a, b, arguments];
}

func('a', 'b', 1, 2, 3);
