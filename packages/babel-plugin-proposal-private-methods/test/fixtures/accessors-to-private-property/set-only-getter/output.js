var _privateFieldValue;

class Cl {
  #privateFieldValue = {
    __proto__: _privateFieldValue || (_privateFieldValue = {
      get _() {
        return this.t.#privateField;
      }

    }),
    t: this
  };
  #privateField = 0;

  constructor() {
    babelHelpers.readOnlyError("#privateFieldValue");
  }

}
