var _initClass, _initClass2;
const dec1 = () => {};
const dec2 = () => {};
let _Bar;
class Bar {}
[_Bar, _initClass] = babelHelpers.applyDecs2303(Bar, [], [0, dec1]).c;
_initClass();
let _Foo;
class Foo extends _Bar {}
[_Foo, _initClass2] = babelHelpers.applyDecs2303(Foo, [], [0, dec2]).c;
_initClass2();
