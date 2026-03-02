var _fooBrandCheck = /*#__PURE__*/new WeakSet();
class A {
  static #foo = void _fooBrandCheck.add(this);
  test() {
    let A = function fn(A) {
      return _fooBrandCheck.has(babelHelpers.checkInRHS(A));
    };
  }
}
