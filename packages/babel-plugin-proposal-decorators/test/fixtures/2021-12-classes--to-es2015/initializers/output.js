var _initClass, _temp2, _initClass2, _temp4;

let _Foo;

new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    var _temp;

    (_temp = super(_Foo), babelHelpers.defineProperty(this, "field", 123), _temp), _initClass();
  }

}, (() => {
  class Foo {}

  (() => {
    [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
  })();
})(), _temp2)();

let _Bar;

new (_temp4 = class extends babelHelpers.identity {
  constructor() {
    var _temp3;

    (_temp3 = super(_Bar), babelHelpers.defineProperty(this, "field", ((() => {
      this.otherField = 456;
    })(), 123)), _temp3), _initClass2();
  }

}, (() => {
  class Bar extends _Foo {}

  (() => {
    [_Bar, _initClass2] = babelHelpers.applyDecs(Bar, [], [dec]);
  })();
})(), _temp4)();
