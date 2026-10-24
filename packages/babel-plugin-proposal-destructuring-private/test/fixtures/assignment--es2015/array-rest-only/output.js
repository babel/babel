var _C;
const _excluded = ["0"];
let result;
class C {}
_C = C;
var _x = {
  _: void 0
};
(() => {
  var _ref;
  var x, z;
  [..._ref] = [_C];
  var _ref$0$x = babelHelpers.assertClassBrand(_C, _ref[0], _x)._;
  x = _ref$0$x === void 0 ? 1 : _ref$0$x;
  z = babelHelpers.objectWithoutProperties(_ref, _excluded);
  result = {
    x,
    z
  };
})();
