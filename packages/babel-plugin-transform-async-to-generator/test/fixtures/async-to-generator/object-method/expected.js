let obj = {
  a: 123,
  foo(bar) {
    return babelHelpers.asyncToGenerator(function* foo() {
      return yield baz(bar);
    }).call(this);
  }
};
