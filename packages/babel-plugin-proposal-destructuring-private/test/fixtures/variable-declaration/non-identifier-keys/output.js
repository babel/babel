class C {
  static #x;
  static {
    var _m = [C, C, C, C],
      w = _m["0"].#x,
      x = _m[1].#x,
      y = _m[2n].#x,
      z = _m[3m].#x;
  }
}
