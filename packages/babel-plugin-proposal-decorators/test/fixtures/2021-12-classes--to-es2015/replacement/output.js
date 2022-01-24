var _initClass, _temp2;

let _Foo;

new (_temp2 = class extends babelHelpers.identity {
  constructor() {
    var _temp;

    (_temp = super(_Foo), babelHelpers.defineProperty(this, "foo", new _Foo()), _temp), _initClass();
  }

}, (() => {
  class Foo {}

  (() => {
    [_Foo, _initClass] = babelHelpers.applyDecs(Foo, [], [dec]);
  })();
})(), _temp2)();
const foo = new _Foo();
