var _initClass, _initClass2;

let _Foo;

class Foo {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static field = 123;
  static {
    _initClass();

  }
}

let _Bar;

class Bar extends _Foo {
  static {
    [_Bar, _initClass2] = babelHelpers.applyDecs(this, [], [dec]);
  }
  static {
    this.otherField = 456;
  }
  static field = 123;
  static {
    _initClass2();

  }
}
