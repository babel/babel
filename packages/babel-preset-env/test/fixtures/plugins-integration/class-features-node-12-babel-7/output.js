class A {
  #x;
}
var _x = /*#__PURE__*/new WeakMap();
var _y = /*#__PURE__*/new WeakSet();
class B {
  constructor() {
    babelHelpers.classPrivateMethodInitSpec(this, _y);
    babelHelpers.classPrivateFieldInitSpec(this, _x, {
      writable: true,
      value: void 0
    });
  }
}
function _y2() {
  babelHelpers.classPrivateFieldGet(this, _x);
}
