class Cl {
  test() {
    return babelHelpers.classPrivateFieldLooseBase(Cl, _foo)[_foo]();
  }

}

var _foo = babelHelpers.classPrivateFieldLooseKey("foo");

var _foo2 = function* _foo2() {
  yield 2;
  return 3;
};

Object.defineProperty(Cl, _foo, {
  value: _foo2
});
