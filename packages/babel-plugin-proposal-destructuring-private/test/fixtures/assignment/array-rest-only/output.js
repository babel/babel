const _excluded = ["0"];
let result;
class C {
  static #x;
  static {
    var _ref, _ref$0$x;
    var x, z;
    [..._ref] = [C], x = (_ref$0$x = _ref[0].#x) === void 0 ? 1 : _ref$0$x, z = babelHelpers.objectWithoutProperties(_ref, _excluded);
    result = {
      x,
      z
    };
  }
}
