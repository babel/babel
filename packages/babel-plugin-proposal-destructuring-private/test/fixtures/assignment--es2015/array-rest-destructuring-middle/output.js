var _C;
let x, y, z;
class C {}
_C = C;
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var _p, _p2, _m;
  [{
    y
  }, _p, ..._p2] = [{
    y: 1
  }, _C], _m = babelHelpers.classStaticPrivateFieldSpecGet(_p, _C, _x), x = _m === void 0 ? y : _m, z = _p2;
})();
