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
expect(f.foo()).toBe("foo");

const b = new Bar;
expect(b.foo()).toBe("foo");
expect(b.bar()).toBe("bar");
