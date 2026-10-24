const _excluded = ["a"];
class C {
  static m(obj) {
    const rest = Object.assign({}, (babelHelpers.objectDestructuringEmpty(obj), obj));
    babelHelpers.objectDestructuringEmpty(obj);
    const rest2 = babelHelpers.objectWithoutProperties(obj, _excluded);
  }
}
var _x = {
  _: 1
};
