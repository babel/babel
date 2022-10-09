class C {}
function _self() {
  return C;
}
var _x = {
  writable: true,
  value: "x"
};
var _y = {
  writable: true,
  value: []
};
var _z = {
  writable: true,
  value: void 0
};
babelHelpers.defineProperty(C, "self", C);
(() => {
  var [_p, _p2,, _p3] = [C, C],
    x = babelHelpers.classStaticPrivateFieldSpecGet(_p === void 0 ? C.self : _p, C, _x),
    [, _p4] = babelHelpers.classStaticPrivateFieldSpecGet(_p2, C, _y),
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_p4 === void 0 ? C.self : _p4, C, _z),
    y = _m === void 0 ? babelHelpers.classStaticPrivateMethodGet(C, C, _self).call(C) : _m,
    z = _p3 === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(y, C, _y) : _p3;
})();
