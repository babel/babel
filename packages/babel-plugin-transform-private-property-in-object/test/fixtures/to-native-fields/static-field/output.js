var _fooBrandCheck = /*#__PURE__*/new WeakSet();
class Foo {
  static #foo = (_fooBrandCheck.add(this), 1);
  test(other) {
    return _fooBrandCheck.has(babelHelpers.checkInRHS(other));
  }
}
