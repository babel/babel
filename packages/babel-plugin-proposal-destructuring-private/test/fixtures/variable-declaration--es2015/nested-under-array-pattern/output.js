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
  var [_p, _p2,, _p3] = [C, C],
      _m = _p === void 0 ? C.self : _p,
      x = babelHelpers.classStaticPrivateFieldSpecGet(_m, C, _x),
      [, _p4] = babelHelpers.classStaticPrivateFieldSpecGet(_p2, C, _y),
      _m2 = _p4 === void 0 ? C.self : _p4,
      _m3 = babelHelpers.classStaticPrivateFieldSpecGet(_m2, C, _z),
      y = _m3 === void 0 ? babelHelpers.classStaticPrivateMethodGet(C, C, _self).call(C) : _m3,
      z = _p3 === void 0 ? babelHelpers.classStaticPrivateFieldSpecGet(y, C, _y) : _p3;
})();
