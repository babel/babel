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
expect(f.test()).toBe(foo);
expect("bar" in f).toBe(false);
