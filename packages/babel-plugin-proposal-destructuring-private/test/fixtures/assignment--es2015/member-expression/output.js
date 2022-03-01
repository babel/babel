let x;

class C {}

var _x = {
  writable: true,
  value: void 0
};
var _y = {
  writable: true,
  value: void 0
};
var _z = {
  writable: true,
  value: void 0
};

(() => {
  var _m, _p, _p2, _p3;

  let z;
  _m = [0, C], [_p, _p2, ..._p3] = _m, babelHelpers.classStaticPrivateFieldSpecSet(C, C, _x, _p), x = babelHelpers.classStaticPrivateFieldSpecGet(_p2, C, _x), z = _p3;
})();
