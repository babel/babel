class Foo {
  static get #tag() {
    return function() { return this; };
  }
  
  static test() {
    const receiver = this.#tag``;
    expect(receiver).toBe(this);
  }
}