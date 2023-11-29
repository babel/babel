var _initClass, _dec, _initClass2, _dec2;
const dec = () => {};
_dec = dec1;
let _Bar;
class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs2301(this, [], [_dec]).c;
  }
  static {
    _initClass();
  }
}
_dec2 = dec2;
let _Foo;
class Foo extends _Bar {
  static {
    [_Foo, _initClass2] = babelHelpers.applyDecs2301(this, [], [_dec2]).c;
  }
  static {
    _initClass2();
  }
}
