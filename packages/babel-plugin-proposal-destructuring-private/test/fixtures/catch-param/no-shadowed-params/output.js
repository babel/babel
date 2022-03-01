class C {
  #x;
  static {
    try {
      throw new C();
    } catch (_e) {
      var x = _e.#x;
    }

  }
}
