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
  var _m = [C, C],
      [_p, _p2,, _p3] = _m,
      _m2 = _p === void 0 ? C.self : _p,
      x = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _x),
      _m3 = babelHelpers.classStaticPrivateFieldSpecGet(_p2, C, _y),
      [, _p4] = _m3,
      _m4 = _p4 === void 0 ? C.self : _p4,
      _m5 = babelHelpers.classStaticPrivateFieldSpecGet(_m4, C, _z),
      y = _m5 === void 0 ? babelHelpers.classStaticPrivateMethodGet(C, C, _self).call(C) : _m5,
      z = _p3 === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(y, C, _y) : _p3;
})();
