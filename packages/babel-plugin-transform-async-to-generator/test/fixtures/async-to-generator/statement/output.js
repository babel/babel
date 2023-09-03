function foo() {
  return (foo = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  })).apply(this, arguments);
}
