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
  value: "#y"
};
babelHelpers.defineProperty(C, "a", "a");
babelHelpers.defineProperty(C, "b", "b");
babelHelpers.defineProperty(C, "c", "c");
(() => {
  var x = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x),
    y = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _y),
    z = Object.assign({}, (babelHelpers.objectDestructuringEmpty(_class), _class));
  result = {
    x,
    y,
    z
  };
})();
