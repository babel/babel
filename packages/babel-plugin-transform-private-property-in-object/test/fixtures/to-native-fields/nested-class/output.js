var _fooBrandCheck = /*#__PURE__*/new WeakSet();
class Foo {
  #foo = (_fooBrandCheck.add(this), 1);
  test() {
    class Nested {
      test() {
        _fooBrandCheck.has(babelHelpers.checkInRHS(this));
      }
    }
    _fooBrandCheck.has(babelHelpers.checkInRHS(this));
  }
}
