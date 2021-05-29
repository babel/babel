class Foo {
    static #tag() {
      return this;
    }
    
    static #tag2 = function () { return this };

    static getReceiver() {
        return this.#tag``;
    }
      
    static getReceiver2() {
        return this.#tag2``;
    }
}

expect(Foo.getReceiver()).toBe(Foo);
expect(Foo.getReceiver2()).toBe(Foo);