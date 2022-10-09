class C {
  constructor() {
    [babelHelpers.classStaticPrivateFieldDestructureSet(C, C, _p).value] = [0];
  }
}
function _set_p(v) {
  babelHelpers.classStaticPrivateFieldSpecSet(C, C, _q, v);
}
var _p = {
  get: void 0,
  set: _set_p
};
var _q = {
  writable: true,
  value: void 0
};
new C();
