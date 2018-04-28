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

expect(f1.instance()).toBe("foo");
expect(f1.static()).toBe("bar");
expect(f2.instance()).toBe("foo");
expect(f2.static()).toBe("bar");

expect(Foo1.instance(f1)).toBe("foo");
expect(Foo1.static()).toBe("bar");
expect(Foo2.instance(f2)).toBe("foo");
expect(Foo2.static()).toBe("bar");

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
