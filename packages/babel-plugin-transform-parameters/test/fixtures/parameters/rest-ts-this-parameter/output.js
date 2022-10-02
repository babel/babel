function u(this: Foo) {
  arguments.length <= 0 ? undefined : arguments[0];
}
function v(this: Foo, event: string) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  args;
}
