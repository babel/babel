const _excluded = ["y"];
let result;
class C {}
var _x = {
  writable: true,
  value: "#x"
};
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var x = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x),
    {
      y
    } = C,
    z = babelHelpers.objectWithoutProperties(C, _excluded);
  result = {
    x,
    y,
    z
  };
})();
