const z = 1;
class C {
  static #x = 2;
  static m(_ref) {
    let x = _ref.#x,
      {
        y = z
      } = _ref;
    return function () {
      var z = 3;
    }();
  }
}
