class Foo {
  get #tag() {
    return function() { return this; };
  }
  
  constructor() {
    const receiver = this.#tag``;
    expect(receiver).toBe(this);
  }
}