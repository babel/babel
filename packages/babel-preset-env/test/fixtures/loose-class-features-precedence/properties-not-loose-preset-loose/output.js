var _foo = /*#__PURE__*/new WeakSet();

class A {
  constructor() {
    _foo.add(this);

    babelHelpers.defineProperty(this, "x", 2);
  }

}

function _foo2() {}
