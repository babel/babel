class Foo {
  get #tag() {
    return () => this;
  }

  constructor() {
    this.#tag``;
  }
}

new Foo();