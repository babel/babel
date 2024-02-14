var _A_brand;
console.log((_A_brand = /*#__PURE__*/Symbol("foo"), class A {
  constructor() {
    Object.defineProperty(this, _A_brand, {
      value: _foo
    });
  }
  method() {
    babelHelpers.classPrivateFieldLooseBase(this, _A_brand)[_A_brand]();
  }
}));
function _foo() {}
