function classFactory() {
  return class Foo {
    #foo = "foo";
    static #bar = "bar";

    instance() {
      return this.#foo;
    }

    static() {
      return Foo.#bar;
    }

    static instance(inst) {
      return inst.#foo;
    }

    static static() {
      return Foo.#bar;
    }
  }
}

const Foo1 = classFactory();
const Foo2 = classFactory();

const f1 = new Foo1;
const f2 = new Foo2;

assert.equal(f1.instance(), "foo");
assert.equal(f1.static(), "bar");
assert.equal(f2.instance(), "foo");
assert.equal(f2.static(), "bar");

assert.equal(Foo1.instance(f1), "foo");
assert.equal(Foo1.static(), "bar");
assert.equal(Foo2.instance(f2), "foo");
assert.equal(Foo2.static(), "bar");

assert.throws(() => {
  f1.instance.call(f2), undefined;
});
assert.throws(() => {
  f2.instance.call(f1), undefined;
});
assert.throws(() => {
  Foo1.instance(f2), undefined;
});
assert.throws(() => {
  Foo2.instance(f1), undefined;
});
