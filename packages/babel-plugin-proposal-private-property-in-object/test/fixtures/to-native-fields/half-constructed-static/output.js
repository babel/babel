var _temp, _temp2;

var _xBrandCheck = /*#__PURE__*/new WeakSet();

var _yBrandCheck = /*#__PURE__*/new WeakSet();

class F {
  static m() {
    _xBrandCheck.has(this);

    _yBrandCheck.has(this);

    F === this;
  }

  static #x = (_temp = 0, _xBrandCheck.add(this), _temp);
  static #y = (_temp2 = (() => {
    throw 'error';
  })(), _yBrandCheck.add(this), _temp2);

  static #z() {}

}
