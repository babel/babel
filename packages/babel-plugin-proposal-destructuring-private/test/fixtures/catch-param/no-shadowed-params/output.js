var x;
class C {
  #x;
  static {
    x = "x";
    try {
      throw new C();
    } catch (_e) {
      let x = _e.#x;
    }
  }
}
