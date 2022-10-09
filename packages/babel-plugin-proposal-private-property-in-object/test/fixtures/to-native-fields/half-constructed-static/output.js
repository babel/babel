var _temp;
var _xBrandCheck = /*#__PURE__*/new WeakSet();
var _yBrandCheck = /*#__PURE__*/new WeakSet();
class F {
  static m() {
    _xBrandCheck.has(this);
    _yBrandCheck.has(this);
    F === this;
  }
  static #x = (_xBrandCheck.add(this), 0);
  static #y = (_temp = (() => {
    throw 'error';
  })(), _yBrandCheck.add(this), _temp);
  static #z() {}
}
