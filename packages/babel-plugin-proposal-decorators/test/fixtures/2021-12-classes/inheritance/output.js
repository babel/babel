var _initClass, _dec, _initClass2, _dec2;
const dec = () => {};
_dec = dec1;
let _Bar;
class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs(this, [], [_dec]);
  }
  static {
    _initClass();
  }
}
_dec2 = dec2;
let _Foo;
class Foo extends _Bar {
  static {
    [_Foo, _initClass2] = babelHelpers.applyDecs(this, [], [_dec2]);
  }
  static {
    _initClass2();
  }
}
