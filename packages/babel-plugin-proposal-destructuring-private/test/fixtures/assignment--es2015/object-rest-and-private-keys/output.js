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
(_C => {
  let x, y, z;
  x = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x), y = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _y), (_C = C, ({} = _C), z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_C), _C)), _C);
  result = {
    x,
    y,
    z
  };
})();
