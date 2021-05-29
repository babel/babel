class Foo {
    #tag() {
      return this;
    }
    
    #tag2 = this.#tag;
  }
  new Foo();