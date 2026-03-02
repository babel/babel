class C {
  static #x = 42;
  static {
    let y;
    for (let x = (_m = C, y = _m.#x, _m).#x;;) {
      var _m;
      break;
    }
    ;
  }
}
