var _get_privateFieldValue;

class Cl {
  #privateFieldValue = Object.defineProperty({
    t: this
  }, "_", {
    get: _get_privateFieldValue || (_get_privateFieldValue = function () {
      return this.t.#privateField;
    })
  });
  #privateField = 0;

  constructor() {
    babelHelpers.readOnlyError("#privateFieldValue");
  }

}
