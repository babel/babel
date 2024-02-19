class A {
  static dynamicCheck() {
    babelHelpers.assertClassBrand(this, A, _x);
    _x = babelHelpers.assertClassBrand(this, A, 2);
    [babelHelpers.toSetter(babelHelpers.assertClassBrand(this, A, _ => _x = _))._] = [];
  }
  static noCheck() {
    _x;
    _x = 2;
    [_x] = [];
  }
}
var _x = 2;
