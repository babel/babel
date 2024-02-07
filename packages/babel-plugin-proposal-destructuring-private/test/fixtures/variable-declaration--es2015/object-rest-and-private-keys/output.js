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
(() => {
  var x = _x._,
    y = _y._,
    z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_C), _C));
  result = {
    x,
    y,
    z
  };
})();
