var _privateFieldValue;

class Cl {
  #privateFieldValue = {
    __proto__: _privateFieldValue ||= {
      get _() {
        return this.t.#privateField;
      },

      set _(_) {
        babelHelpers.readOnlyError("#privateFieldValue");
      }

    },
    t: this
  };
  #privateField = 0;
  counter = 0;

  get self() {
    this.counter++;
    return this;
  }

  constructor() {
    this.self.#privateFieldValue._ = 1([this.self.#privateFieldValue._] = [1]);
  }

}

const cl = new Cl();
