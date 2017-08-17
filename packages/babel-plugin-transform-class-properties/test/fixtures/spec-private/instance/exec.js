class Foo {
  #bar = "foo";

  test() {
    return this.#bar;
  }

  update() {
    this.#bar++;
  }

  set(val) {
    this.#bar = val;
  }

  static test(foo) {
    return foo.#bar;
  }

  static update(foo) {
    foo.#bar **= 2;
  }
}

const f = new Foo();
assert.equal(f.test(), "foo");
assert.equal(Foo.test(f), "foo");
assert.isFalse("bar" in f);

f.set(1);
assert.equal(f.test(), 1);
f.update();
assert.equal(Foo.test(f), 2);
Foo.update(f);
assert.equal(f.test(), 4);
