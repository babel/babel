var _initClass, _temp, _initClass2, _temp2;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "field", 123)), _initClass();
  }
}, (() => {
  class Foo {}
  [_Foo, _initClass] = babelHelpers.applyDecs2305(Foo, [], [dec]).c;
})(), _temp)();
let _Bar;
new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    (super(_Bar), babelHelpers.defineProperty(this, "field", ((() => {
      this.otherField = 456;
    })(), 123))), _initClass2();
  }
}, (() => {
  class Bar extends _Foo {}
  [_Bar, _initClass2] = babelHelpers.applyDecs2305(Bar, [], [dec]).c;
})(), _temp2)();
