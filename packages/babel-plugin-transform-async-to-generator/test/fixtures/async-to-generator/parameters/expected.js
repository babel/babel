function foo(_x) {
  return _foo.apply(this, arguments);
}

function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* (bar) {});
  return _foo.apply(this, arguments);
}
