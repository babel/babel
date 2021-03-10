var _foo = new WeakSet();

class A {
  constructor() {
    _foo.add(this);

    babelHelpers.defineProperty(this, "x", 2);
  }

}

function _foo2() {}
