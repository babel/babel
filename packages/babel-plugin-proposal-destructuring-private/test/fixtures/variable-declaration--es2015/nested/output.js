class C {}
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
babelHelpers.defineProperty(C, "self", C);
var _self = {
  writable: true,
  value: C
};
(() => {
  let cloned;
  var _m = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x),
    _m2 = _m === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(C, C, _self) : _m,
    _m3 = _m2[babelHelpers.classStaticPrivateFieldSpecGet(C, C, _z)],
    {
      b
    } = _m3,
    _m4 = babelHelpers.classStaticPrivateFieldSpecGet(_m3, C, _x),
    y = _m4 === void 0 ? (C.b = "bb", babelHelpers.classStaticPrivateFieldSpecGet(babelHelpers.classStaticPrivateFieldSpecGet(C, C, _self), C, _y)) : _m4,
    _m5 = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _x),
    yy = _m5 === void 0 ? (delete C.self, ({
      ...cloned
    } = C), babelHelpers.classStaticPrivateFieldSpecSet(C, C, _y, "yy")) : _m5,
    yy2 = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _y);
})();
