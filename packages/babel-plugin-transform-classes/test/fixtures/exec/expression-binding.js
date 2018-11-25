var Foo = class Foo {
  bar() {
    return Foo;
  }
}

var Bar = Foo;
Foo = 5;
expect((new Bar).bar()).toBe(Bar);
