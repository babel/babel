class Foo {
  #bar;

  test() {
    return this.#bar;
  }
}

assert.equal(new Foo().test(), undefined);
