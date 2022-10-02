class C {}
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var [_p, ..._p2] = [C],
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_p, C, _x),
    x = _m === void 0 ? 1 : _m,
    z = _p2;
})();
