var _C;
const _excluded = ["0"];
let result;
class C {}
_C = C;
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var [..._p] = [_C],
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_p[0], _C, _x),
    x = _m === void 0 ? 1 : _m,
    z = babelHelpers.objectWithoutProperties(_p, _excluded);
  result = {
    x,
    z
  };
})();
