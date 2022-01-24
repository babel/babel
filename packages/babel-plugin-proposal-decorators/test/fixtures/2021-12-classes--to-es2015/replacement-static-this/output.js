var _initClass, _temp2;

let _Foo;

new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    var _temp;

    (_temp = super(_Foo), babelHelpers.defineProperty(this, "field", ((() => {
      this;
    })(), this)), _temp), (() => {
      this;
    })(), _initClass();
  }

}, (() => {
  class Foo {}

  (() => {
    [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
  })();
})(), _temp2)();
