var _xBrandCheck = /*#__PURE__*/new WeakSet();
var _ABrandCheck = /*#__PURE__*/new WeakSet();
class A {
  #x = (_ABrandCheck.add(this), void _xBrandCheck.add(this));
  #m() {}
  test() {
    _xBrandCheck.has(babelHelpers.checkInRHS(this));
    _ABrandCheck.has(babelHelpers.checkInRHS(this));
    _xBrandCheck.has(babelHelpers.checkInRHS(this));
    _ABrandCheck.has(babelHelpers.checkInRHS(this));
  }
}
