var foo = "bar";

var _bar = /*#__PURE__*/new WeakMap(),
    _baz = /*#__PURE__*/new WeakMap();

class Foo {
  constructor(_foo) {
    _bar.set(this, this);

    _baz.set(this, foo);
  }

}
