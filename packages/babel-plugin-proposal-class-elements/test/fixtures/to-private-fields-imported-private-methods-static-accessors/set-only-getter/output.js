class Cl {
  static #privateFieldValue = {
    get _() {
      return this.t.#privateField;
    },

    set _(_) {
      babelHelpers.readOnlyError("#privateFieldValue");
    },

    t: this
  };
  static #privateField = 0;

  constructor() {
    Cl.#privateFieldValue._ = 1;
    [Cl.#privateFieldValue._] = [1];
  }

}

const cl = new Cl();
