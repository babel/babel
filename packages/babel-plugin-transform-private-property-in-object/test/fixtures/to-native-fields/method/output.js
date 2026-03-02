var _FooBrandCheck = /*#__PURE__*/new WeakSet();
class Foo {
  constructor() {
    _FooBrandCheck.add(this);
  }
  #foo() {}
  test(other) {
    return _FooBrandCheck.has(babelHelpers.checkInRHS(other));
  }
}
