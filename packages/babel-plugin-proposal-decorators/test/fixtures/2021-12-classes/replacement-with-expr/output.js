let _initClass, _Bar;
const dec = () => {};
const Foo = (class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  bar = new _Bar();
  static {
    _initClass();
  }
}, _Bar);
const foo = new Foo();
