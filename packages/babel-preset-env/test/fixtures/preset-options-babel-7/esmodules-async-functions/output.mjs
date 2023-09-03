function f() {
  return (f = babelHelpers.asyncToGenerator(function* () {})).apply(this, arguments);
}
