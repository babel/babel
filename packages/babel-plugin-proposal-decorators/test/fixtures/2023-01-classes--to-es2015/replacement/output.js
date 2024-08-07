var _Class, _Foo3;
let _initClass, _Foo2;
const dec = () => {};
let _Foo;
new (_Foo2 = (_Foo3 = class Foo {}, [_Foo, _initClass] = babelHelpers.applyDecs2301(_Foo3, [], [dec]).c, _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), babelHelpers.defineProperty(this, "foo", new _Foo()), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
const foo = new _Foo();
