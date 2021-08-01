var _tag;

class Foo {
  #tag = {
    __proto__: _tag ||= {
      get _() {
        return () => this.t;
      },

      set _(_) {
        babelHelpers.readOnlyError("#tag");
      }

    },
    t: this
  };

  constructor() {
    this.#tag._``;
  }

}

new Foo();
