var _initClass, _classDecs, _initClass2, _classDecs2;
const dec = () => {};
_classDecs = [dec1];
let _Bar;
class Bar {
  static {
    [_Bar, _initClass] = babelHelpers.applyDecs2203R(this, [], _classDecs).c;
  }
  static {
    _initClass();
  }
}
_classDecs2 = [dec2];
let _Foo;
class Foo extends _Bar {
  static {
    [_Foo, _initClass2] = babelHelpers.applyDecs2203R(this, [], _classDecs2).c;
  }
  static {
    _initClass2();
  }
}
