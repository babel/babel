var _C;
class C {}
_C = C;
var _x = {
  _: void 0
};
(() => {
  var {
      a = 1
    } = _C,
    _C$x = _x._,
    x = _C$x === void 0 ? 2 : _C$x,
    {
      b = 3
    } = _C;
})();
