const _excluded = ["y"];
var _C;
let result;
class C {}
_C = C;
babelHelpers.defineProperty(C, "x", "x");
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "z", "z");
var _x = {
  writable: true,
  value: _C
};
(() => {
  var {
      x
    } = _C,
    _babelHelpers$classSt = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x),
    {
      y
    } = _babelHelpers$classSt,
    z = babelHelpers.objectWithoutProperties(_babelHelpers$classSt, _excluded);
  result = {
    x,
    y,
    z
  };
})();
