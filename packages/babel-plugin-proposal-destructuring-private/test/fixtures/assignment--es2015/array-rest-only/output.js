var _class;
const _excluded = ["0"];
let result;
class C {}
_class = C;
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var _p, _m;
  var x, z;
  [..._p] = [_class], _m = babelHelpers.classStaticPrivateFieldSpecGet(_p[0], _class, _x), x = _m === void 0 ? 1 : _m, z = babelHelpers.objectWithoutProperties(_p, _excluded);
  result = {
    x,
    z
  };
})();
