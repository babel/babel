class Foo {
  foo() {
    return babelHelpers.asyncToGenerator(function* foo() {
      var wat = yield bar();
    }).call(this);
  }
}
