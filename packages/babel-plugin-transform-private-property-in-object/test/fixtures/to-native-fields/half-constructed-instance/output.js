var _temp;
var _FBrandCheck = /*#__PURE__*/new WeakSet();
var _xBrandCheck = /*#__PURE__*/new WeakSet();
var _yBrandCheck = /*#__PURE__*/new WeakSet();
class F {
  m() {
    _FBrandCheck.has(babelHelpers.checkInRHS(this));
    _xBrandCheck.has(babelHelpers.checkInRHS(this));
    _yBrandCheck.has(babelHelpers.checkInRHS(this));
    _FBrandCheck.has(babelHelpers.checkInRHS(this));
  }
  get #w() {}
  #x = (_FBrandCheck.add(this), _xBrandCheck.add(this), 0);
  #y = (_temp = (() => {
    throw 'error';
  })(), _yBrandCheck.add(this), _temp);
  #z() {}
}
