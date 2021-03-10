var _privateMethod = new WeakSet();

class X {
  constructor() {
    _privateMethod.add(this);
  }

}

function _privateMethod2() {
  return 42;
}
