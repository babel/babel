class C {
  static #y = "y";
  static #z = "self";
  static #x;
  static b = "b";
  static self = C;
  static #self = C;
  static {
    let cloned, b, y, yy, yy2;
    var _C$x = C.#x;
    var _C$x2 = _C$x === void 0 ? C.#self : _C$x;
    ({} = _C$x2);
    var _C$x2$C$z = _C$x2[C.#z];
    ({
      b
    } = _C$x2$C$z);
    var _C$x2$C$z$x = _C$x2$C$z.#x;
    y = _C$x2$C$z$x === void 0 ? (C.b = "bb", C.#self.#y) : _C$x2$C$z$x;
    var _C$x2$x = _C$x2.#x;
    yy = _C$x2$x === void 0 ? (delete C.self, {
      ...cloned
    } = C, C.#y = "yy") : _C$x2$x;
    yy2 = C.#y;
  }
}
