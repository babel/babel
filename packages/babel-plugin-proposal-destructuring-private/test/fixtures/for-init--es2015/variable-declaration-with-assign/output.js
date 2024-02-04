var _C;
class C {}
_C = C;
var _x = {
  writable: true,
  value: 42
};
(() => {
  let y;
  for (let x = babelHelpers.classStaticPrivateFieldSpecGet((_m = _C, y = babelHelpers.classStaticPrivateFieldSpecGet(_m, _C, _x), _m), _C, _x);;) {
    var _m;
    break;
  }
  ;
})();
