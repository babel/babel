var _initClass, _temp;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "foo", new _Foo())), _initClass();
  }
}, (_Foo2 => {
  class Foo {}
  _Foo2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs2311(_Foo2, [dec], []).c;
})(), _temp)();
const foo = new _Foo();
