var _fooBrandCheck = /*#__PURE__*/new WeakSet();
var _barBrandCheck2 = /*#__PURE__*/new WeakSet();
class Foo {
  #foo = (_fooBrandCheck.add(this), 1);
  #bar = (_barBrandCheck2.add(this), 1);
  test() {
    var _barBrandCheck = /*#__PURE__*/new WeakSet();
    class Nested {
      #bar = (_barBrandCheck.add(this), 2);
      test() {
        _fooBrandCheck.has(babelHelpers.checkInRHS(this));
        _barBrandCheck.has(babelHelpers.checkInRHS(this));
      }
    }
    _fooBrandCheck.has(babelHelpers.checkInRHS(this));
    _barBrandCheck2.has(babelHelpers.checkInRHS(this));
  }
}
