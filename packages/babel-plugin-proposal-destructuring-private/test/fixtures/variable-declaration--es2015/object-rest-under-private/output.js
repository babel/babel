var _C;
const _excluded = ["y"];
let result;
class C {}
_C = C;
babelHelpers.defineProperty(C, "x", "x");
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "z", "z");
var _x = {
  _: _C
};
(() => {
  var {
      x
    } = _C,
    _C$x = _x._,
    {
      y
    } = _C$x,
    z = babelHelpers.objectWithoutProperties(_C$x, _excluded);
  result = {
    x,
    y,
    z
  };
})();
