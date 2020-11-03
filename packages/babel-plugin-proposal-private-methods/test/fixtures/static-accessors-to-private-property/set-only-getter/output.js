class Cl {
  static #privateStaticFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    get: function () {
      return Cl.#PRIVATE_STATIC_FIELD;
    }
  });
  static #PRIVATE_STATIC_FIELD = 0;

  static setPrivateStaticFieldValue() {
    babelHelpers.readOnlyError("#privateStaticFieldValue");
  }

}
