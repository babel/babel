function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* foo(bar) {});
  return _foo.apply(this, arguments);
}

function foo(_x) {
  return _foo.apply(this, arguments);
}
