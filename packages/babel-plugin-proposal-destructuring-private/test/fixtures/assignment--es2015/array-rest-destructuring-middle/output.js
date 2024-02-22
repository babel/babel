var _C;
let x, y, z;
class C {}
_C = C;
var _x = {
  _: void 0
};
(() => {
  var _p, _p2, _m;
  [{
    y
  }, _p, ..._p2] = [{
    y: 1
  }, _C], _m = babelHelpers.assertClassBrand(_C, _p, _x)._, x = _m === void 0 ? y : _m, z = _p2;
})();
