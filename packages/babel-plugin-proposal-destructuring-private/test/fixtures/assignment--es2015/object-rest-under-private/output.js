const _excluded = ["y"];
var _class;
let result;
class C {}
_class = C;
babelHelpers.defineProperty(C, "x", "x");
babelHelpers.defineProperty(C, "y", "y");
babelHelpers.defineProperty(C, "z", "z");
var _x = {
  writable: true,
  value: _class
};
(_babelHelpers$classSt => {
  var x, y, z;
  ({
    x
  } = _class), (_babelHelpers$classSt = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x), ({
    y
  } = _babelHelpers$classSt), z = babelHelpers.objectWithoutProperties(_babelHelpers$classSt, _excluded), _babelHelpers$classSt);
  result = {
    x,
    y,
    z
  };
})();
