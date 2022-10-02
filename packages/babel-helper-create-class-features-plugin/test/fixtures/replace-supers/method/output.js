var _foo = /*#__PURE__*/new WeakSet();
class A extends B {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
}
function _foo2() {
  let _A;
  babelHelpers.get(babelHelpers.getPrototypeOf(A.prototype), "x", this);
}
