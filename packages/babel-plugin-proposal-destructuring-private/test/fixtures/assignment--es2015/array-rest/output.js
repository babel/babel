let x, z;

class C {}

var _x = {
  writable: true,
  value: void 0
};

(() => {
  var _m, _p, _p2, _m2;

  _m = [C], [_p, ..._p2] = _m, _m2 = babelHelpers.classStaticPrivateFieldSpecGet(_p, C, _x), x = _m2 === void 0 ? 1 : _m2, z = _p2;
})();
