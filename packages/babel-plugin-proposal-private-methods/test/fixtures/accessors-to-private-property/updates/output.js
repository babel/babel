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

  get publicFieldValue() {
    return this.publicField;
  }

  set publicFieldValue(newValue) {
    this.publicField = newValue;
  }

  testUpdates() {
    this.#privateField = 0;
    this.publicField = 0;
    this.#privateFieldValue._ = this.#privateFieldValue._++;
    this.publicFieldValue = this.publicFieldValue++;
    ++this.#privateFieldValue._;
    ++this.publicFieldValue;
    this.#privateFieldValue._ += 1;
    this.publicFieldValue += 1;
    this.#privateFieldValue._ = -(this.#privateFieldValue._ ** this.#privateFieldValue._);
    this.publicFieldValue = -(this.publicFieldValue ** this.publicFieldValue);
  }

}
