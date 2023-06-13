var _class;
class C {}
_class = C;
var _x = {
  writable: true,
  value: void 0
};
(() => {
  var {
      a = 1
    } = _class,
    _m = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x),
    x = _m === void 0 ? 2 : _m,
    {
      b = 3
    } = _class;
})();
