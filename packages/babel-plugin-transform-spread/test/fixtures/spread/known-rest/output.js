function foo() {
  for (var _len = arguments.length, bar = new Array(_len), _key = 0; _key < _len; _key++) {
    bar[_key] = arguments[_key];
  }

  return bar.concat();
}
