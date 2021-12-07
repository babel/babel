function func() {
  for (var _args = arguments, _len = _args.length, arguments = new Array(_len), _key = 0; _key < _len; _key++) {
    arguments[_key] = _args[_key];
  }

  console.log(arguments); // [1, 2, 3]
}

func(1, 2, 3);
