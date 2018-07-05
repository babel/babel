function _foo() {
  _foo = babelHelpers.asyncToGenerator(function* foo() {
    var wat = yield bar();
  });
  return _foo.apply(this, arguments);
}

class Foo {
  foo() {
    return _foo.apply(this, arguments);
  }

}
