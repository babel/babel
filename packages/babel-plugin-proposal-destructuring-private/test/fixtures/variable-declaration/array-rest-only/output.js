const _excluded = ["0"];
let result;
class C {
  static #x;
  static {
    var [..._p] = [C],
      _m = _p[0].#x,
      x = _m === void 0 ? 1 : _m,
      z = babelHelpers.objectWithoutProperties(_p, _excluded);
    result = {
      x,
      z
    };
  }
}
