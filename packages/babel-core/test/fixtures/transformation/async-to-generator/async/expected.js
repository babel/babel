class Foo {
  foo() {
    return babelHelpers.asyncToGenerator(function* () {
      var wat = await bar();
    })();
  }
}
