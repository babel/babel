function _wrapped() {
  _wrapped = babelHelpers.asyncToGenerator(function* () {
    super.method();

    var arrow = () => super.method();
  });
  return _wrapped.apply(this, arguments);
}

class Foo extends class {} {
  method() {
    return _wrapped.apply(this, arguments);
  }

}
