var _foo, _bar;

class Foo {
  constructor() {
    _bar.set(this, "bar");
  }

}

_foo = new WeakMap();

_foo.set(Foo, "foo");

_bar = new WeakMap();