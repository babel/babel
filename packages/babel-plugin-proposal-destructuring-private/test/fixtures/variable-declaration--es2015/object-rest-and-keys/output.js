const _excluded = ["y"];
var _C;
let result;
class C {}
_C = C;
var _x = {
  _: "#x"
};
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var x = _x._,
    {
      y
    } = _C,
    z = babelHelpers.objectWithoutProperties(_C, _excluded);
  result = {
    x,
    y,
    z
  };
})();
