class Foo {
    static #tag() {
      return this;
    }
    
    static #tag2 = () => this

    static getReceiver() {
        return this.#tag``;
    }
      
    static getReceiver2() {
        return this.#tag2``;
    }
}
  
expect(Foo.getReceiver()).toBe(Foo.getReceiver2());