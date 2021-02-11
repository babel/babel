var _method = new WeakSet();

class A {
  constructor() {
    _method.add(this);
  }

  run() {
    babelHelpers.readOnlyError("#method");
  }

}

var _method2 = function _method2() {};
