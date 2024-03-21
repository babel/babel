let _initClass, _Bar;
const dec = () => {};
const Foo = (class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs2301(this, [], [dec]).c;
  }
  bar = new _Bar();
  static {
    _initClass();
  }
}, _Bar);
const foo = new Foo();
