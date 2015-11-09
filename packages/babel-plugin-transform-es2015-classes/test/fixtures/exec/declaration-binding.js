class Foo {
  bar() {
    return Foo;
  }
}

var Bar = Foo;
Foo = 5;
assert.equal((new Bar).bar(), Bar);
