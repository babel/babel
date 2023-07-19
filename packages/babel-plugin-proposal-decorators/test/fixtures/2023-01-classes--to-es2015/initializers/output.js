var _initClass, _temp, _initClass2, _temp2;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "field", 123)), _initClass();
  }
}, (_class2 => {
  class Foo {}
  _class2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs2301(_class2, [], [dec]).c;
})(), _temp)();
let _Bar;
new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    (super(_Bar), babelHelpers.defineProperty(this, "field", ((() => {
      this.otherField = 456;
    })(), 123))), _initClass2();
  }
}, (_class3 => {
  class Bar extends _Foo {}
  _class3 = Bar;
  [_Bar, _initClass2] = babelHelpers.applyDecs2301(_class3, [], [dec]).c;
})(), _temp2)();
