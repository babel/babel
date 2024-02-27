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
    x = babelHelpers.assertClassBrand(_C, _p === void 0 ? _C.self : _p, _x)._,
    [, _p4] = babelHelpers.assertClassBrand(_C, _p2, _y)._,
    _m = babelHelpers.assertClassBrand(_C, _p4 === void 0 ? _C.self : _p4, _z)._,
    y = _m === void 0 ? _self.call(_C) : _m,
    z = _p3 === void 0 ? babelHelpers.assertClassBrand(_C, y, _y)._ : _p3;
})();
