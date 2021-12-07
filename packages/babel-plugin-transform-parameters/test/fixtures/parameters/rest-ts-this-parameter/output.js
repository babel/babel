function u(this: Foo) {
  arguments.length <= 0 ? undefined : arguments[0];
}

function v(this: Foo, event: string) {
  for (var _args = arguments, _len = _args.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = _args[_key];
  }

  args;
}
