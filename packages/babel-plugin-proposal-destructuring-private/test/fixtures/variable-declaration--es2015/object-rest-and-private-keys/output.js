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
(() => {
  var x = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _x),
    y = babelHelpers.classStaticPrivateFieldSpecGet(C, C, _y),
    z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(C), C));
  result = {
    x,
    y,
    z
  };
})();
