function fn() {
  return new class {
    #priv;

    method(obj) {
      return #priv in obj;
    }
  }
}
