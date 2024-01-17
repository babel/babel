var _C;
class C {}
_C = C;
function _self() {
  return _C;
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
babelHelpers.defineProperty(C, "self", _C);
(() => {
  var [_p, _p2,, _p3] = [_C, _C],
    x = babelHelpers.classStaticPrivateFieldSpecGet(_p === void 0 ? _C.self : _p, _C, _x),
    [, _p4] = babelHelpers.classStaticPrivateFieldSpecGet(_p2, _C, _y),
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_p4 === void 0 ? _C.self : _p4, _C, _z),
    y = _m === void 0 ? babelHelpers.classStaticPrivateMethodGet(_C, _C, _self).call(_C) : _m,
    z = _p3 === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(y, _C, _y) : _p3;
})();
