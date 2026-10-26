var _C;
let x;
class C {}
_C = C;
var _x = {
  _: void 0
};
var _y = {
  _: void 0
};
var _z = {
  _: void 0
};
(() => {
  var _ref;
  let z;
  [_x._, _ref, ...z] = [0, _C];
  x = babelHelpers.assertClassBrand(_C, _ref, _x)._;
})();
