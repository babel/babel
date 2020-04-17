var foo = "bar";

class Foo {
  bar = foo;
  static bar = baz;

  constructor() {
    var foo = "foo";
    var baz = "baz";
  }
}
