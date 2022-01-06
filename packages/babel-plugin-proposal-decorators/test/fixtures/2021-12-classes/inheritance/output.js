var _initClass, _initClass2;

let _Bar;

class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs(this, [], [dec1]);
  }
  static {
    _initClass();

  }
}

let _Foo;

class Foo extends _Bar {
  static {
    [_Foo, _initClass2] = babelHelpers.applyDecs(this, [], [dec2]);
  }
  static {
    _initClass2();

  }
}
