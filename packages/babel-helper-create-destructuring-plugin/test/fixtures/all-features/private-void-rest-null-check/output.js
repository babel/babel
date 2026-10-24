const _excluded = ["a"];
class C {
  static m(obj) {
    const rest = babelHelpers.objectWithoutProperties(Object.assign(Object.create(null), (babelHelpers.objectDestructuringEmpty(obj), obj)), []);
    babelHelpers.objectDestructuringEmpty(obj);
    const rest2 = babelHelpers.objectWithoutProperties(obj, _excluded);
  }
}
var _x = {
  _: 1
};
