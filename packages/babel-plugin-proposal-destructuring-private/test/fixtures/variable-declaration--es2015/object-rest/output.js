var _C;
let result;
class C {}
_C = C;
var _x = {
  writable: true,
  value: "#x"
};
var _y = {
  writable: true,
  value: "#y"
};
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var _m, _m2;
  var {
      [_m = _C.a]: a
    } = _C,
    x = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x),
    {
      [_m2 = _C.b]: b
    } = _C,
    y = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _y),
    z = babelHelpers.objectWithoutProperties(_C, [_m, _m2].map(babelHelpers.toPropertyKey));
  result = {
    a,
    b,
    x,
    y,
    z
  };
})();
