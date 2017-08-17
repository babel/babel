class Foo {
  #prop = "foo";

  foo() {
    return this.#prop;
  }
}

class Bar extends Foo {
  #prop = "bar";

  bar() {
    return this.#prop;
  }
}

const f = new Foo;
assert.equal(f.foo(), "foo");

const b = new Bar;
assert.equal(b.foo(), "foo");
assert.equal(b.bar(), "bar");
