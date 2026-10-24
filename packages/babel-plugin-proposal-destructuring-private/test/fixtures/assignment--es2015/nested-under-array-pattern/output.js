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
  var _ref, _ref2, _ref3, _ref4;
  let x, y, z;
  [_ref, _ref2,, _ref3] = [_C, _C];
  var _ref5 = _ref === void 0 ? _C.self : _ref;
  x = babelHelpers.assertClassBrand(_C, _ref5, _x)._;
  [, _ref4] = babelHelpers.assertClassBrand(_C, _ref2, _y)._;
  var _ref6 = _ref4 === void 0 ? _C.self : _ref4;
  var _ref6$z = babelHelpers.assertClassBrand(_C, _ref6, _z)._;
  y = _ref6$z === void 0 ? _self.call(_C) : _ref6$z;
  z = _ref3 === void 0 ? babelHelpers.assertClassBrand(_C, y, _y)._ : _ref3;
})();
