function fn() {
  return (fn = babelHelpers.asyncToGenerator(function* () {
    yield yield 1;
  })).apply(this, arguments);
}
