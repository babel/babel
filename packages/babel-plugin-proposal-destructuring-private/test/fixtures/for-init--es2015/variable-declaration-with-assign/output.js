class C {}
var _x = {
  writable: true,
  value: 42
};
(() => {
  let y;
  for (let x = babelHelpers.classStaticPrivateFieldSpecGet((_m = C, y = babelHelpers.classStaticPrivateFieldSpecGet(_m, C, _x), _m), C, _x);;) {
    var _m;
    break;
  }
  ;
})();
