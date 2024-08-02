var _C;
class C {}
_C = C;
var _y = {
  _: "y"
};
var _z = {
  _: "self"
};
var _x = {
  _: void 0
};
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "self", _C);
var _self = {
  _: _C
};
(() => {
  let cloned;
  var _m = _x._,
    _m2 = _m === void 0 ? _self._ : _m,
    _m3 = _m2[_z._],
    {
      b
    } = _m3,
    _m4 = babelHelpers.assertClassBrand(_C, _m3, _x)._,
    y = _m4 === void 0 ? (_C.b = "bb", babelHelpers.assertClassBrand(_C, _self._, _y)._) : _m4,
    _m5 = babelHelpers.assertClassBrand(_C, _m2, _x)._,
    yy = _m5 === void 0 ? (delete _C.self, {
      ...cloned
    } = _C, _y._ = "yy") : _m5,
    yy2 = _y._;
})();
