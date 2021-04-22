var _privateMethod = /*#__PURE__*/new WeakSet();

class X {
  constructor() {
    _privateMethod.add(this);
  }

}

function _privateMethod2() {
  return 42;
}
