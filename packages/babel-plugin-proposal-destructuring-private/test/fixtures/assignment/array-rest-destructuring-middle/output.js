let x, y, z;

class C {
  static #x;
  static {
    var _m, _p, _p2, _m2;

    _m = [{
      y: 1
    }, C], [{
      y
    }, _p, ..._p2] = _m, _m2 = _p.#x, x = _m2 === void 0 ? y : _m2, z = _p2;
  }
}
