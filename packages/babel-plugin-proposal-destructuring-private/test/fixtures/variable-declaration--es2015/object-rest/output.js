var _C;
let result;
class C {}
_C = C;
var _x = {
  _: "#x"
};
var _y = {
  _: "#y"
};
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var _m, _m2;
  var {
      [_m = _C.a]: a
    } = _C,
    x = _x._,
    {
      [_m2 = _C.b]: b
    } = _C,
    y = _y._,
    z = babelHelpers.objectWithoutProperties(_C, [_m, _m2].map(babelHelpers.toPropertyKey));
  result = {
    a,
    b,
    x,
    y,
    z
  };
})();
