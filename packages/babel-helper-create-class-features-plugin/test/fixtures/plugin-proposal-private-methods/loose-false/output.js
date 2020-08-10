var _privateMethod = new WeakSet();

class X {
  constructor() {
    _privateMethod.add(this);
  }

}

var _privateMethod2 = function _privateMethod2() {
  return 42;
};
