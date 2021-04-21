var _xBrandCheck = new WeakSet();

var _ABrandCheck = new WeakSet();

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
