var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

class A {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
    this.x = 2;
  }

}

function _foo2() {}
