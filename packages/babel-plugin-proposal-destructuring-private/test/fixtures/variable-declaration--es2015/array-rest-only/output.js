const _excluded = ["0"];
let result;
class C {}
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var [..._p] = [C],
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_p[0], C, _x),
    x = _m === void 0 ? 1 : _m,
    z = babelHelpers.objectWithoutProperties(_p, _excluded);
  result = {
    x,
    z
  };
})();
