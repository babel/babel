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
  var [_ref = _C.self, _ref2,, _ref3] = [_C, _C],
    x = babelHelpers.assertClassBrand(_C, _ref, _x)._,
    [, _ref4 = _C.self] = babelHelpers.assertClassBrand(_C, _ref2, _y)._,
    _ref4$z = babelHelpers.assertClassBrand(_C, _ref4, _z)._,
    y = _ref4$z === void 0 ? _self.call(_C) : _ref4$z,
    z = _ref3 === void 0 ? babelHelpers.assertClassBrand(_C, y, _y)._ : _ref3;
})();
