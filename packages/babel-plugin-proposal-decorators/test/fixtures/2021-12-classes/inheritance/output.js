var _initClass, _dec, _initClass2, _dec2;
const dec = () => {};
let _Bar;
_dec = dec1;
class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs(this, [], [_dec]);
  }
  static {
    _initClass();
  }
}
let _Foo;
_dec2 = dec2;
class Foo extends _Bar {
  static {
    [_Foo, _initClass2] = babelHelpers.applyDecs(this, [], [_dec2]);
  }
  static {
    _initClass2();
  }
}
