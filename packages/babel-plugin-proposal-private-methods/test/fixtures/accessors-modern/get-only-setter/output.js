var _set_privateFieldValue;

class Cl {
  #privateFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    set: _set_privateFieldValue || (_set_privateFieldValue = function (newValue) {
      this.t.#privateField = newValue;
    })
  });
  #privateField = 0;

  constructor() {
    this.publicField = this.#privateFieldValue._;
  }

}
