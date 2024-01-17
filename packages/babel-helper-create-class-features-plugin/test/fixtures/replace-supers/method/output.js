var _A;
var _foo = /*#__PURE__*/new WeakSet();
class A extends B {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _foo);
  }
}
_A = A;
function _foo2() {
  let _A2;
  babelHelpers.get(babelHelpers.getPrototypeOf(_A.prototype), "x", this);
}
