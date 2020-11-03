class Cl {
  static #privateFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    get: function () {
      return Cl.#privateField;
    },
    set: function (newValue) {
      Cl.#privateField = newValue;
    }
  });
  static #privateField = "top secret string";
  static publicField = "not secret string";

  static publicGetPrivateField() {
    return Cl.#privateFieldValue._;
  }

  static publicSetPrivateField(newValue) {
    Cl.#privateFieldValue._ = newValue;
  }

  static get publicFieldValue() {
    return Cl.publicField;
  }

  static set publicFieldValue(newValue) {
    Cl.publicField = newValue;
  }

  static testUpdates() {
    Cl.#privateField = 0;
    Cl.publicField = 0;
    Cl.#privateFieldValue._ = Cl.#privateFieldValue._++;
    Cl.publicFieldValue = Cl.publicFieldValue++;
    ++Cl.#privateFieldValue._;
    ++Cl.publicFieldValue;
    Cl.#privateFieldValue._ += 1;
    Cl.publicFieldValue += 1;
    Cl.#privateFieldValue._ = -(Cl.#privateFieldValue._ ** Cl.#privateFieldValue._);
    Cl.publicFieldValue = -(Cl.publicFieldValue ** Cl.publicFieldValue);
  }

}
