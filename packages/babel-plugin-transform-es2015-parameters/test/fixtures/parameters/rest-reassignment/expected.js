function f() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  args[0] = convert(args[0]);
  return g.apply(undefined, args);
}
