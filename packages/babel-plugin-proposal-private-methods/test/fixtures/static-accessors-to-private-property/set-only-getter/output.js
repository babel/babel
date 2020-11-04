class Cl {
  static #privateStaticFieldValue = {
    get _() {
      return Cl.#PRIVATE_STATIC_FIELD;
    },

    t: this
  };
  static #PRIVATE_STATIC_FIELD = 0;

  static setPrivateStaticFieldValue() {
    babelHelpers.readOnlyError("#privateStaticFieldValue");
  }

}
