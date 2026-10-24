class C {
  static #x = 1;
  static m(_ref) {
    let x = _ref.#x;
    let y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
  }
}
