class Foo extends class {} {
  method() {
    var _superprop_getMethod = () => super.method;

    return babelHelpers.asyncToGenerator(function* () {
      _superprop_getMethod().call(this);

      var arrow = () => _superprop_getMethod().call(this);
    })();
  }

}
