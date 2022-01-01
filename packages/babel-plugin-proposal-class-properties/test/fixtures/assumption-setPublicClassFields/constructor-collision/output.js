var foo = "bar";

class Foo {
  constructor() {
    this.bar = foo;
    var _foo = "foo";
    var baz = "baz";
  }

}

Foo.bar = baz;
