var _A;
var _A_brand = /*#__PURE__*/Symbol("getA");
class A {
  constructor() {
    Object.defineProperty(this, _A_brand, {
      get: _get_getA,
      set: void 0
    });
  }
}
_A = A;
function _get_getA() {
  return _A;
}
