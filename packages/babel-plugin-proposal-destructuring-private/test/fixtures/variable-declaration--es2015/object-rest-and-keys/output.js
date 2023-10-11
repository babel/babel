const _excluded = ["y"];
var _class;
let result;
class C {}
_class = C;
var _x = {
  writable: true,
  value: "#x"
};
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var x = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x),
    {
      y
    } = _class,
    z = babelHelpers.objectWithoutProperties(_class, _excluded);
  result = {
    x,
    y,
    z
  };
})();
