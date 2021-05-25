function fn() {
  return new class {
    static #priv;

    method(obj) {
      return #priv in obj;
    }
  }
}
