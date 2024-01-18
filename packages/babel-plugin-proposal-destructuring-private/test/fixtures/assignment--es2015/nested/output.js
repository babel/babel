var _C;
class C {}
_C = C;
var _y = {
  writable: true,
  value: "y"
};
var _z = {
  writable: true,
  value: "self"
};
var _x = {
  writable: true,
  value: void 0
};
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "self", _C);
var _self = {
  writable: true,
  value: _C
};
(() => {
  var _m, _m2, _m3, _m4, _m5;
  let cloned, b, y, yy, yy2;
  _m = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x), _m2 = _m === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _self) : _m, _m3 = _m2[babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _z)], ({
    b
  } = _m3), _m4 = babelHelpers.classStaticPrivateFieldSpecGet(_m3, _C, _x), y = _m4 === void 0 ? (_C.b = "bb", babelHelpers.classStaticPrivateFieldSpecGet(babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _self), _C, _y)) : _m4, _m5 = babelHelpers.classStaticPrivateFieldSpecGet(_m2, _C, _x), yy = _m5 === void 0 ? (delete _C.self, ({
    ...cloned
  } = _C), babelHelpers.classStaticPrivateFieldSpecSet(_C, _C, _y, "yy")) : _m5, yy2 = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _y);
})();
