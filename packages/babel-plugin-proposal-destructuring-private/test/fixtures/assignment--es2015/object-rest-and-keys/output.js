const _excluded = ["y"];
var _class;
let result;
class C {}
_class = C;
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
(_class2 => {
  let x, y, z;
  x = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x), (_class2 = _class, ({
    y
  } = _class2), z = babelHelpers.objectWithoutProperties(_class2, _excluded), _class2);
  result = {
    x,
    y,
    z
  };
})();
