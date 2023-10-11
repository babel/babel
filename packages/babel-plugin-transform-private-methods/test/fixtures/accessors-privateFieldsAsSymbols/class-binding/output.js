var _class;
var _getA = /*#__PURE__*/Symbol("getA");
class A {
  constructor() {
    Object.defineProperty(this, _getA, {
      get: _get_getA,
      set: void 0
    });
  }
}
_class = A;
function _get_getA() {
  return _class;
}
