class Cl {
  static #privateStaticFieldValue = {
    set _(newValue) {
      Cl.#PRIVATE_STATIC_FIELD = newValue;
    },

    t: this
  };
  static #PRIVATE_STATIC_FIELD = 0;

  static getPrivateStaticFieldValue() {
    return Cl.#privateStaticFieldValue._;
  }

}
