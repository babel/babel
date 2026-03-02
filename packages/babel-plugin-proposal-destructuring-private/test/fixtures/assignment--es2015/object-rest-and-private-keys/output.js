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
(_C2 => {
  let x, y, z;
  x = _x._, y = _y._, _C2 = _C, {} = _C2, z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_C2), _C2)), _C2;
  result = {
    x,
    y,
    z
  };
})();
