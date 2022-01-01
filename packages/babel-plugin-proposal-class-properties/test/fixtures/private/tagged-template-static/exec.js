class Foo {
    static #tag = function () { return this };

    static getReceiver() {
        return this.#tag``;
    }
}
  
expect(Foo.getReceiver()).toBe(Foo);