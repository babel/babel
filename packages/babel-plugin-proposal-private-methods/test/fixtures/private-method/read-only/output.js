var _method = new WeakSet();

class A {
  constructor() {
    _method.add(this);
  }

  run() {
    this, 2, babelHelpers.readOnlyError("#method");
  }

}

var _method2 = function _method2() {};
