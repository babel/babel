var _get_privateFieldValue, _set_privateFieldValue;

class Cl {
  #privateFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_privateFieldValue || (_get_privateFieldValue = function () {
      return this.t.#privateField;
    }),
    set: _set_privateFieldValue || (_set_privateFieldValue = function (newValue) {
      this.t.#privateField = newValue;
    })
  });
  #privateField = "top secret string";

  constructor() {
    this.publicField = "not secret string";
  }

  publicGetPrivateField() {
    return this.#privateFieldValue._;
  }

  publicSetPrivateField(newValue) {
    this.#privateFieldValue._ = newValue;
  }

}
