var _initClass, _initClass2;
const dec1 = () => {};
const dec2 = () => {};
let _Bar;
class Bar {}
[_Bar, _initClass] = babelHelpers.applyDecs(Bar, [], [dec1]);
_initClass();
let _Foo;
class Foo extends _Bar {}
[_Foo, _initClass2] = babelHelpers.applyDecs(Foo, [], [dec2]);
_initClass2();
