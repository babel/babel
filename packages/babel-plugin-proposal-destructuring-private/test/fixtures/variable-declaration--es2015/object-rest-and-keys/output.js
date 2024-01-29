const _excluded = ["y"];
var _C;
let result;
class C {}
_C = C;
var _x = {
  writable: true,
  value: "#x"
};
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var x = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x),
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
