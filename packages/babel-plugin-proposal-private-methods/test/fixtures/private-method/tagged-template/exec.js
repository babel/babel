class Foo {
    #tag() {
      return this;
    }
  
    constructor() {
      const receiver = this.#tag`tagged template`;
      expect(receiver === this).toBe(true);
    }
  }
  new Foo();