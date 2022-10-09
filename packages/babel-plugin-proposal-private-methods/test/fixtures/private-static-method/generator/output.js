class Cl {
  test() {
    return babelHelpers.classStaticPrivateMethodGet(Cl, Cl, _foo).call(Cl);
  }
}
function* _foo() {
  yield 2;
  return 3;
}
