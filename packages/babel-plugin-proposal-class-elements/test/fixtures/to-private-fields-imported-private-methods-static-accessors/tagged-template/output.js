class Foo {
  static #tag = {
    get _() {
      return function () {
        return this;
      };
    },

    set _(_) {
      babelHelpers.readOnlyError("#tag");
    },

    t: this
  };

  static test() {
    const receiver = this.#tag._``;
    expect(receiver).toBe(this);
  }

}
