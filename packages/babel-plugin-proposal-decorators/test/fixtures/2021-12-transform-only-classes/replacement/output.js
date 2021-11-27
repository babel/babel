var _initClass;

let _Foo;

class Foo {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static foo = new _Foo();
  static {
    _initClass();

  }
}

const foo = new _Foo();
