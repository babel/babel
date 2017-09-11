class Foo {
  constructor() {
    return Symbol();
  }
}

const f = new Foo;
assert.ok(f instanceof Foo);
assert.ok(typeof f === "object");
