class Foo {
  constructor() {
    return Symbol();
  }
}

const f = new Foo;
expect(f).toBeInstanceOf(Foo);
expect(typeof f).toBe("object");
