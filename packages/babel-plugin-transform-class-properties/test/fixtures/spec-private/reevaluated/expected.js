function classFactory() {
  var _bar, _foo;

  var Foo = function Foo() {
    babelHelpers.classCallCheck(this, Foo);

    _foo.set(this, "foo");
  };

  _bar = new WeakMap();

  _bar.set(Foo, "bar");

  _foo = new WeakMap();
}