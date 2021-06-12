class Foo {
  static get #tag() {
    return () => this;
  }
  
  static test() {
    const receiver = this.#tag``;
    expect(receiver).toBe(this);
  }
}