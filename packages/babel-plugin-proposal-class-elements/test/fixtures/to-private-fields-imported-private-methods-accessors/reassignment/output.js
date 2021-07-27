var _privateFieldValue;

let results = [];

class Foo {
  #privateFieldValue = {
    __proto__: _privateFieldValue ||= {
      get _() {
        return 42;
      },

      set _(_) {
        babelHelpers.readOnlyError("#privateFieldValue");
      }

    },
    t: this
  };

  constructor() {
    this.self.#privateFieldValue._ = results.push(2);
  }

  get self() {
    results.push(1);
    return this;
  }

}
