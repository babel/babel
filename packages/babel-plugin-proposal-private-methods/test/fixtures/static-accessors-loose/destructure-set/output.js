var _p = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("p");
var _q = /*#__PURE__*/babelHelpers.classPrivateFieldLooseKey("q");
class C {
  constructor() {
    [babelHelpers.classPrivateFieldLooseBase(C, _p)[_p]] = [0];
  }
}
function _set_p(v) {
  babelHelpers.classPrivateFieldLooseBase(C, _q)[_q] = v;
}
Object.defineProperty(C, _p, {
  get: void 0,
  set: _set_p
});
Object.defineProperty(C, _q, {
  writable: true,
  value: void 0
});
new C();
