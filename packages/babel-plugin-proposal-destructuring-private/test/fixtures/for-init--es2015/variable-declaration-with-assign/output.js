var _class;
class C {}
_class = C;
var _x = {
  writable: true,
  value: 42
};
(() => {
  let y;
  for (let x = babelHelpers.classStaticPrivateFieldSpecGet((_m = _class, y = babelHelpers.classStaticPrivateFieldSpecGet(_m, _class, _x), _m), _class, _x);;) {
    var _m;
    break;
  }
  ;
})();
