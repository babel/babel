var _C;
const _excluded = ["0"];
let result;
class C {}
_C = C;
var _x = {
  _: void 0
};
(() => {
  var [..._p] = [_C],
    _m = babelHelpers.assertClassBrand(_C, _p[0], _x)._,
    x = _m === void 0 ? 1 : _m,
    z = babelHelpers.objectWithoutProperties(_p, _excluded);
  result = {
    x,
    z
  };
})();
