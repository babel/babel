var _initClass, _Bar2, _initClass2, _Bar3, _Foo2;
const dec1 = () => {};
const dec2 = () => {};
let _Bar;
class Bar {}
_Bar2 = Bar;
[_Bar, _initClass] = babelHelpers.applyDecs2311(_Bar2, [dec1], []).c;
_initClass();
let _Foo;
class Foo extends (_Bar3 = _Bar) {}
_Foo2 = Foo;
[_Foo, _initClass2] = babelHelpers.applyDecs2311(_Foo2, [dec2], [], 0, void 0, _Bar3).c;
_initClass2();
