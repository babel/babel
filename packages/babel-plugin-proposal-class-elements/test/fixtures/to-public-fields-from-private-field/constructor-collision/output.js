var foo = "bar",
    fox = 2;

var _bar = /*#__PURE__*/new WeakMap(),
    _baz = /*#__PURE__*/new WeakMap();

class Foo {
  x = void _bar.set(this, foo);

  constructor() {
    _baz.set(this, fox);

    var foo = "foo";
    var _fox = 3;
  }

}
