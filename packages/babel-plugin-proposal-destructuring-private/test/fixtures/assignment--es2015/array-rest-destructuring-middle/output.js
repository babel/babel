var _C;
let x, y, z;
class C {}
_C = C;
var _x = {
  _: void 0
};
(() => {
  var _ref;
  [{
    y
  }, _ref, ...z] = [{
    y: 1
  }, _C];
  var _ref$x = babelHelpers.assertClassBrand(_C, _ref, _x)._;
  x = _ref$x === void 0 ? y : _ref$x;
})();
