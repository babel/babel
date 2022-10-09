class C {}
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var {
      a = 1
    } = C,
    _m = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x),
    x = _m === void 0 ? 2 : _m,
    {
      b = 3
    } = C;
})();
