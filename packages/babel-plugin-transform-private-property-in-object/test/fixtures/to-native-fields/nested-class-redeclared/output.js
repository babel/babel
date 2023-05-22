var _fooBrandCheck2 = /*#__PURE__*/new WeakSet();
class Foo {
  #foo = (_fooBrandCheck2.add(this), 1);
  test() {
    var _fooBrandCheck = /*#__PURE__*/new WeakSet();
    class Nested {
      #foo = (_fooBrandCheck.add(this), 2);
      test() {
        _fooBrandCheck.has(babelHelpers.checkInRHS(this));
      }
    }
    _fooBrandCheck2.has(babelHelpers.checkInRHS(this));
  }
}
