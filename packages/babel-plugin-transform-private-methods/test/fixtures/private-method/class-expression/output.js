var _A_brand;
console.log((_A_brand = /*#__PURE__*/new WeakSet(), class A {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _A_brand);
  }
  method() {
    babelHelpers.assertClassBrand(this, _A_brand, _foo).call(this);
  }
}));
function _foo() {}
