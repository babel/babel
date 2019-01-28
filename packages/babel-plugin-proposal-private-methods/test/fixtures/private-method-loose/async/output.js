class Cl {
  constructor() {
    Object.defineProperty(this, _foo, {
      value: _foo2
    });
  }

  test() {
    return babelHelpers.classPrivateFieldLooseBase(this, _foo)[_foo]();
  }

}

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

var _foo2 = async function _foo2() {
  return 2;
};
