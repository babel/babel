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
  var _C$x, _C$x2, _C$x2$C$z, _C$x2$C$z$x, _C$x2$x;
  let cloned, b, y, yy, yy2;
  _C$x2 = (_C$x = _x._) === void 0 ? _self._ : _C$x, {} = _C$x2, {
    b
  } = _C$x2$C$z = _C$x2[_z._], y = (_C$x2$C$z$x = babelHelpers.assertClassBrand(_C, _C$x2$C$z, _x)._) === void 0 ? (_C.b = "bb", babelHelpers.assertClassBrand(_C, _self._, _y)._) : _C$x2$C$z$x, yy = (_C$x2$x = babelHelpers.assertClassBrand(_C, _C$x2, _x)._) === void 0 ? (delete _C.self, {
    ...cloned
  } = _C, _y._ = "yy") : _C$x2$x, yy2 = _y._;
})();
