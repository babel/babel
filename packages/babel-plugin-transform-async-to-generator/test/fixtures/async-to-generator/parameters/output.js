function foo() {
  return (foo = babelHelpers.asyncToGenerator(function* (bar) {})).apply(this, arguments);
}
