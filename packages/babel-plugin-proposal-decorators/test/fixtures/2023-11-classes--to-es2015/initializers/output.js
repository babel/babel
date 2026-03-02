var _Class, _Foo3, _Foo4, _Class2, _Bar3;
let _initClass, _Foo2, _initClass2, _Bar2;
const dec = () => {};
let _Foo;
new (_Foo2 = (_Foo3 = class Foo {}, [_Foo, _initClass] = babelHelpers.applyDecs2311(_Foo3, [dec], []).c, _Foo3), _Class = class extends babelHelpers.identity {
  constructor() {
    super(_Foo), babelHelpers.defineProperty(this, "field", 123), _initClass();
  }
}, babelHelpers.defineProperty(_Class, _Foo2, void 0), _Class)();
let _Bar;
new (_Bar2 = (_Bar3 = class Bar extends (_Foo4 = _Foo) {}, [_Bar, _initClass2] = babelHelpers.applyDecs2311(_Bar3, [dec], [], 0, void 0, _Foo4).c, _Bar3), _Class2 = class extends babelHelpers.identity {
  constructor() {
    super(_Bar), babelHelpers.defineProperty(this, "field", ((() => {
      this.otherField = 456;
    })(), 123)), _initClass2();
  }
}, babelHelpers.defineProperty(_Class2, _Bar2, void 0), _Class2)();
