function foo() {
  for (var _args = arguments, _len = _args.length, bar = new Array(_len), _key = 0; _key < _len; _key++) {
    bar[_key] = _args[_key];
  }

  return [].concat(bar);
}
