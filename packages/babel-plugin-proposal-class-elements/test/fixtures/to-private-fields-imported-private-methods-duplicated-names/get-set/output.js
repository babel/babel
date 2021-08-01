var _getSet;

class Cl {
  #getSet = {
    __proto__: _getSet ||= {
      get _() {
        return this.t.#privateField;
      },

      set _(newValue) {
        this.t.#privateField = newValue;
      }

    },
    t: this
  };
  #privateField = 0;
}
