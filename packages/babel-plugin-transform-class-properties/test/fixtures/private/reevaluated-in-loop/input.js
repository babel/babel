const classes = [];
const instances = [];
for (const i of ["1", "2"]) {
  class Foo {
    #foo = "foo" + i;
    static #bar = "bar" + i;

    instance() {
      return this.#foo;
    }

    static static() {
      return Foo.#bar;
    }

    static instance(inst) {
      return inst.#foo;
    }
  }
  classes.push(Foo);
  instances.push(new Foo());
}

const [Foo1, Foo2] = classes;
const [f1, f2] = instances;

expect(f1.instance()).toBe("foo1");
expect(f2.instance()).toBe("foo2");
expect(Foo1.static()).toBe("bar1");
expect(Foo2.static()).toBe("bar2");
expect(Foo1.instance(f1)).toBe("foo1");
expect(() => Foo1.instance(f2)).toThrow(TypeError);
expect(() => Foo2.instance(f1)).toThrow(TypeError);
