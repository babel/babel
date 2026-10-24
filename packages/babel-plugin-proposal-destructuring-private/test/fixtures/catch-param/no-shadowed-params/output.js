var x;
class C {
  #x;
  static {
    x = "x";
    try {
      throw new C();
    } catch (_ref) {
      let x = _ref.#x;
    }
  }
}
