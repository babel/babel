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
  var _C$a, _C$b;
  var a, b, x, y, z;
  ({
    [_C$a = babelHelpers.toPropertyKey(_C.a)]: a
  } = _C), x = _x._, {
    [_C$b = babelHelpers.toPropertyKey(_C.b)]: b
  } = _C, y = _y._, z = babelHelpers.objectWithoutProperties(_C, [_C$a, _C$b]);
  result = {
    a,
    b,
    x,
    y,
    z
  };
})();
