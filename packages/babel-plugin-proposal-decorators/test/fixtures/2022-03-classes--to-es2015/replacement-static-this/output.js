var _initClass, _temp;
const dec = () => {};
let _Foo;
new (_temp = class extends babelHelpers.identity {
  constructor() {
    (super(_Foo), babelHelpers.defineProperty(this, "field", ((() => {
      this;
    })(), this))), (() => {
      this;
    })(), _initClass();
  }
}, (_class2 => {
  class Foo {}
  _class2 = Foo;
  [_Foo, _initClass] = babelHelpers.applyDecs2203R(_class2, [], [dec]).c;
})(), _temp)();
