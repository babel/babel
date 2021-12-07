const a = 'bar';

function foo() {
  for (var _args = arguments, _len = _args.length, a = new Array(_len), _key = 0; _key < _len; _key++) {
    a[_key] = _args[_key];
  }

  return a;
}
