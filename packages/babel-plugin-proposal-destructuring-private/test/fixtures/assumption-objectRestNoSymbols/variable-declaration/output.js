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
  var _m, _m2;
  var {
      [_m = _class.a]: a
    } = _class,
    x = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _x),
    {
      [_m2 = _class.b]: b
    } = _class,
    y = babelHelpers.classStaticPrivateFieldSpecGet(_class, _class, _y),
    z = babelHelpers.objectWithoutPropertiesLoose(_class, [_m, _m2].map(babelHelpers.toPropertyKey));
  result = {
    a,
    b,
    x,
    y,
    z
  };
})();
