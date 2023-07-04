const _excluded = ["y"];
let result;
class C {}
var _x = {
  writable: true,
  value: "#x"
};
var _y = {
  writable: true,
  value: "y"
};
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(_C => {
  let x, y, z;
  x = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x), (_C = C, ({
    y
  } = _C), z = babelHelpers.objectWithoutProperties(_C, _excluded), _C);
  result = {
    x,
    y,
    z
  };
})();
