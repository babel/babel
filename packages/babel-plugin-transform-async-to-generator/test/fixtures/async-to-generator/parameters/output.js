function foo(_x) {
  return (foo = babelHelpers.asyncToGenerator(function* (bar) {})).apply(this, arguments);
}
