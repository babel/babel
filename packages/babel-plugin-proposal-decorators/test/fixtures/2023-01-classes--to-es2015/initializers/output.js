var _initClass, _temp, _initClass2, _temp2;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "field", 123)), _initClass();
  }
}, (_Foo2 => {
  class Foo {}
  _Foo2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs2301(_Foo2, [], [dec]).c;
})(), _temp)();
let _Bar;
new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    (super(_Bar), babelHelpers.defineProperty(this, "field", ((() => {
      this.otherField = 456;
    })(), 123))), _initClass2();
  }
}, (_Bar2 => {
  class Bar extends _Foo {}
  _Bar2 = Bar;
  [_Bar, _initClass2] = babelHelpers.applyDecs2301(_Bar2, [], [dec]).c;
})(), _temp2)();
