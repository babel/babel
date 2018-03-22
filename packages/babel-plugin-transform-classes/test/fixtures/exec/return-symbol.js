class Foo {
  constructor() {
    return Symbol();
  }
}

const f = new Foo;
expect(f instanceof Foo).toBeTruthy();
expect(typeof f).toBe("object");
