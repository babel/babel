let result;
class C {}
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
  var a, b, x, y, z;
  ({
    [_m = C.a]: a
  } = C), x = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x), ({
    [_m2 = C.b]: b
  } = C), y = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _y), z = babelHelpers.objectWithoutProperties(C, [_m, _m2].map(babelHelpers.toPropertyKey));
  result = {
    a,
    b,
    x,
    y,
    z
  };
})();
