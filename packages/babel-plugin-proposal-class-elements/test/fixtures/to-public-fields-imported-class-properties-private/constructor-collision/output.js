var foo = "bar";

var _bar = /*#__PURE__*/new WeakMap();

class Foo {
  constructor() {
    _bar.set(this, foo);

    var _foo = "foo";
  }

}
