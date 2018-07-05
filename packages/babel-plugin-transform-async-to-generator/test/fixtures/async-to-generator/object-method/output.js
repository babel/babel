function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* foo(bar) {
    return yield baz(bar);
  });
  return _foo.apply(this, arguments);
}

let obj = {
  a: 123,

  foo(_x) {
    return _foo.apply(this, arguments);
  }

};
