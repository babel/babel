var _initClass, _temp;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "foo", new _Foo())), _initClass();
  }
}, (_class2 => {
  class Foo {}
  _class2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs(_class2, [], [dec]);
})(), _temp)();
const foo = new _Foo();
