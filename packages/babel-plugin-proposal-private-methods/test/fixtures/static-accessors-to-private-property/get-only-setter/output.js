class Cl {
  static #privateStaticFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    set: function (newValue) {
      Cl.#PRIVATE_STATIC_FIELD = newValue;
    }
  });
  static #PRIVATE_STATIC_FIELD = 0;

  static getPrivateStaticFieldValue() {
    return Cl.#privateStaticFieldValue._;
  }

}
