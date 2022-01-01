class Foo {
  #tag() {
    return this;
  }
  
  constructor() {
    const receiver = this.#tag`tagged template`;
    expect(receiver).toBe(this);
  }
}
new Foo();