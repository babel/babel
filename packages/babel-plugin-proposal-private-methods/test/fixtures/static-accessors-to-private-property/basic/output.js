class Cl {
  static #privateStaticFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    get: function () {
      return Cl.#PRIVATE_STATIC_FIELD;
    },
    set: function (newValue) {
      Cl.#PRIVATE_STATIC_FIELD = `Updated: ${newValue}`;
    }
  });
  static #PRIVATE_STATIC_FIELD = "top secret string";

  static getValue() {
    return Cl.#privateStaticFieldValue._;
  }

  static setValue() {
    Cl.#privateStaticFieldValue._ = "dank";
  }

}
