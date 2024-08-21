const _excluded = ["y"];
var _C;
let result;
class C {}
_C = C;
babelHelpers.defineProperty(C, "x", "x");
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "z", "z");
var _x = {
  _: _C
};
(_x$_ => {
  var x, y, z;
  ({
    x
  } = _C), _x$_ = _x._, {
    y
  } = _x$_, z = babelHelpers.objectWithoutProperties(_x$_, _excluded), _x$_;
  result = {
    x,
    y,
    z
  };
})();
