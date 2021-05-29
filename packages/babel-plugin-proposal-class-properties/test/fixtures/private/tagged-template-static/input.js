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