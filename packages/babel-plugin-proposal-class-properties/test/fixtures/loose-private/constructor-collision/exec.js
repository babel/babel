var foo = "bar";

class Foo {
  #bar = foo;

  constructor() {
    var foo = "foo";
  }

  test() {
    return this.#bar;
  }
}

const f = new Foo;
assert.equal(f.test(), foo);
assert.isFalse("bar" in f);
