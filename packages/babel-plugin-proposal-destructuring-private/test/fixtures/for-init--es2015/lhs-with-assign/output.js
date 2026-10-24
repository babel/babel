var _C;
class C {}
_C = C;
var _x = {
  _: 42
};
(() => {
  let x, y;
  for (x = babelHelpers.assertClassBrand(_C, (y = _x._, _C), _x)._;;) {
    break;
  }
})();
