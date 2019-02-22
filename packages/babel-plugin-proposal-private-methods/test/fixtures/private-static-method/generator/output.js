class Cl {
  test() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _foo);
  }

}

var _foo = function* _foo() {
  yield 2;
  return 3;
};
