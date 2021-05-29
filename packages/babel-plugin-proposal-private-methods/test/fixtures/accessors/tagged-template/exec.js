class Foo {
  #tag() {
    return this;
  }

  get #privateTagMethod(){
      return this.#tag``
  }

  publicGetPrivateTagMethod(){
      return this.#privateTagMethod
  }
}
const instance = new Foo();

expect(instance === instance.publicGetPrivateTagMethod()).toEqual(true)