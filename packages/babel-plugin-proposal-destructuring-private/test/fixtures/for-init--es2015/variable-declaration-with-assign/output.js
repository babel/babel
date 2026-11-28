var _C;
class C {}
_C = C;
var _x = {
  _: 42
};
(() => {
  let y;
  for (let x = babelHelpers.assertClassBrand(_C, (y = _x._, _C), _x)._;;) {
    break;
  }
  ;
})();
