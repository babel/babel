var _fooBrandCheck = /*#__PURE__*/new WeakSet();
class A {
  #foo = void _fooBrandCheck.add(this);
  static #_ = register(A, _fooBrandCheck.has(babelHelpers.checkInRHS(A)));
}
