var _priv = /*#__PURE__*/new WeakSet();

class A {
  constructor() {
    _priv.add(this);
  }

  test() {
    [(this, babelHelpers.readOnlyErrorSet("#priv"))._] = [3];
  }

}

function _priv2() {}
