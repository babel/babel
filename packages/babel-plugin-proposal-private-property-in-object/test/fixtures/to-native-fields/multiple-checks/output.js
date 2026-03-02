var _xBrandCheck = /*#__PURE__*/new WeakSet();

var _ABrandCheck = /*#__PURE__*/new WeakSet();

class A {
  #x = (_ABrandCheck.add(this), void _xBrandCheck.add(this));

  #m() {}

  test() {
    _xBrandCheck.has(this);

    _ABrandCheck.has(this);

    _xBrandCheck.has(this);

    _ABrandCheck.has(this);
  }

}
