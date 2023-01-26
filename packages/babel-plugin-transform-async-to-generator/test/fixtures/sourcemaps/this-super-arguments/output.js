class Foo {
  bar() {
    var _arguments = arguments,
      _newtarget = new.target,
      _superprop_getA = () => super.a,
      _superprop_get = _prop => super[_prop],
      _this = this;
    return babelHelpers.asyncToGenerator(function* () {
      _superprop_getA().call(_this);
      _superprop_getA();
      _superprop_get('a');
      _superprop_get(a);
      _this.a;
      _newtarget;
      _arguments[0];
    })();
  }
}
