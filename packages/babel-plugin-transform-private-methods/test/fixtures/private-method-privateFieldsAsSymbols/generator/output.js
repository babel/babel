var _Cl_brand = /*#__PURE__*/Symbol("foo");
class Cl {
  constructor() {
    Object.defineProperty(this, _Cl_brand, {
      value: _foo
    });
  }
  test() {
    return babelHelpers.classPrivateFieldLooseBase(this, _Cl_brand)[_Cl_brand]();
  }
}
function* _foo() {
  yield 2;
  return 3;
}
