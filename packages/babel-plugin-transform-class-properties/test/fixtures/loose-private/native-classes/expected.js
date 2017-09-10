var _foo, _bar;

class Foo {
  constructor() {
    Object.defineProperty(this, _bar, {
      writable: true,
      value: "bar"
    });
  }

}

_foo = babelHelpers.classPrivateFieldKey("foo");
Object.defineProperty(Foo, _foo, {
  writable: true,
  value: "foo"
});
_bar = babelHelpers.classPrivateFieldKey("bar");
