function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    var wat = yield bar();
  });
  return _wrapped.apply(this, arguments);
}

class Foo {
  foo() {
    return _wrapped.apply(this, arguments);
  }

}
