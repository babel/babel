class C {
  static #x;
  static {
    var _m = [C, C, C, C],
        _m2 = _m["0"],
        w = _m2.#x,
        _m3 = _m[1],
        x = _m3.#x,
        _m4 = _m[2n],
        y = _m4.#x,
        _m5 = _m[3m],
        z = _m5.#x;
  }
}
