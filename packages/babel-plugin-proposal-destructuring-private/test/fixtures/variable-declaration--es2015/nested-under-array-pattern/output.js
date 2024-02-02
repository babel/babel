var _C;
class C {}
_C = C;
function _self() {
  return _C;
}
var _x = {
  _: "x"
};
var _y = {
  _: []
};
var _z = {
  _: void 0
};
babelHelpers.defineProperty(C, "self", _C);
(() => {
  var [_p, _p2,, _p3] = [_C, _C],
    x = babelHelpers.assertClassBrand(_p === void 0 ? _C.self : _p, _C, _x)._,
    [, _p4] = babelHelpers.assertClassBrand(_p2, _C, _y)._,
    _m = babelHelpers.assertClassBrand(_p4 === void 0 ? _C.self : _p4, _C, _z)._,
    y = _m === void 0 ? _self.call(_C) : _m,
    z = _p3 === void 0 ? babelHelpers.assertClassBrand(y, _C, _y)._ : _p3;
})();
