var foo = "bar";

class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "bar", foo);
    var _foo = "foo";
    var _baz = "baz";
  }

}

babelHelpers.defineProperty(Foo, "bar", baz);
