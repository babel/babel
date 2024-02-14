var _A;
var _A_brand = /*#__PURE__*/Symbol("getA");
class A {
  constructor() {
    Object.defineProperty(this, _A_brand, {
      value: _getA
    });
  }
}
_A = A;
function _getA() {
  return _A;
}
