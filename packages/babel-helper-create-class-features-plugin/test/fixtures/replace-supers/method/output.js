var _A;
var _A_brand = /*#__PURE__*/new WeakSet();
class A extends B {
  constructor(...args) {
    super(...args);
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
  }
}
_A = A;
function _foo() {
  let _A2;
  babelHelpers.superPropGet(_A.prototype, "x", this);
}
