var _initClass, _class, _initClass2, _class2;
const dec1 = () => {};
const dec2 = () => {};
let _Bar;
class Bar {}
_class = Bar;
[_Bar, _initClass] = babelHelpers.applyDecs(_class, [], [dec1]);
_initClass();
let _Foo;
class Foo extends _Bar {}
_class2 = Foo;
[_Foo, _initClass2] = babelHelpers.applyDecs(_class2, [], [dec2]);
_initClass2();
