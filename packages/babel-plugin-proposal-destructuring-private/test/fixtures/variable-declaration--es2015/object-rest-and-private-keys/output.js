var _C;
let result;
class C {}
_C = C;
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
  var x = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _x),
    y = babelHelpers.classStaticPrivateFieldSpecGet(_C, _C, _y),
    z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_C), _C));
  result = {
    x,
    y,
    z
  };
})();
