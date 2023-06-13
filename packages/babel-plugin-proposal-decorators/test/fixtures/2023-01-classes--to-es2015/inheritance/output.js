var _initClass, _class, _initClass2, _class2;
const dec1 = () => {};
const dec2 = () => {};
let _Bar;
class Bar {}
_class = Bar;
[_Bar, _initClass] = babelHelpers.applyDecs2301(_class, [], [dec1]).c;
_initClass();
let _Foo;
class Foo extends _Bar {}
_class2 = Foo;
[_Foo, _initClass2] = babelHelpers.applyDecs2301(_class2, [], [dec2]).c;
_initClass2();
