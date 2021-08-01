class C {
  static #p = {
    get _() {
      babelHelpers.writeOnlyError("#p");
    },

    set _(v) {
      C.#q = v;
    },

    t: this
  };
  static #q;

  constructor() {
    [C.#p._] = [0];
  }

}

new C();
