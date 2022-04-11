class F {
  static m() {
    #x in this;
    #y in this;
    #z in this;
  }
  static #x = 0;
  static #y = (() => {
    throw 'error';
  })();
  static #z() {}
}
