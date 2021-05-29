class Foo {
    static #tag() {
      return this;
    }
  
    static get privateTagMethod() {
      return this.#tag``;
    }
}