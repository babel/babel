class Foo {
  get #tag() {
    return () => this;
  }
  
  constructor() {
    const receiver = this.#tag``;
    expect(receiver).toBe(this);
  }
}