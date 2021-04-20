var _xBrandCheck = new WeakSet();

class A {
  #x = void _xBrandCheck.add(this);

  test() {
    _xBrandCheck.has(this);
  }

}
