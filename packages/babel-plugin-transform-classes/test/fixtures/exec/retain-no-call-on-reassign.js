class Foo {
  bar() {
    return Foo;
  }
}

var Bar = Foo;
Foo = 5;
expect(function () {
  Bar.call(6);
}).toThrow("Cannot call a class as a function");
