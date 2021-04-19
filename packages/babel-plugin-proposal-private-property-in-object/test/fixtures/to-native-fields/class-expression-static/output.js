function fn() {
  return new class _class {
    static #priv;

    method(obj) {
      return _class === obj;
    }

  }();
}
