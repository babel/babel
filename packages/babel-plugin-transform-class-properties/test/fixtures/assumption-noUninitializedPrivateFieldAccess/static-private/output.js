class A {
  static dynamicCheck() {
    babelHelpers.assertClassBrand(A, this, _x);
    _x = babelHelpers.assertClassBrand(A, this, 2);
    [babelHelpers.toSetter(babelHelpers.assertClassBrand(A, this, _ => _x = _))._] = [];
  }
  static noCheck() {
    _x;
    _x = 2;
    [_x] = [];
  }
}
var _x = 2;
