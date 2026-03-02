class Foo {
  static #tag() {
    return this;
  }

  static getReceiver() {
    return this.#tag``;
  }
}

expect(Foo.getReceiver()).toBe(Foo);