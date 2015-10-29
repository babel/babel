function noop() {}

function override() {
  return "bar";
}

@override
class Foo {}

@noop
class Bar {
  constructor() {
    this.foo = "bar";
  }
}

assert.equal(Foo, "bar");
assert.equal(new Bar().foo, "bar");
