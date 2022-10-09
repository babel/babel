let x, y, z;
class C {
  static #x;
  static {
    var _p, _p2, _m;
    [{
      y
    }, _p, ..._p2] = [{
      y: 1
    }, C], _m = _p.#x, x = _m === void 0 ? y : _m, z = _p2;
  }
}
