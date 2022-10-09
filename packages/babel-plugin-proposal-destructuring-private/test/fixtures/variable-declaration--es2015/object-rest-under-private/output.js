const _excluded = ["y"];
let result;
class C {}
babelHelpers.defineProperty(C, "x", "x");
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "z", "z");
var _x = {
  writable: true,
  value: C
};
(() => {
  var {
      x
    } = C,
    _babelHelpers$classSt = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x),
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
