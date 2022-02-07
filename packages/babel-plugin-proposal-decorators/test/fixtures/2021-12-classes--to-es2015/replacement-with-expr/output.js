var _initClass, _Bar, _class, _temp;

const Foo = ((_temp = _class = class Bar {
  constructor() {
    babelHelpers.defineProperty(this, "bar", new _Bar());
  }

}, (() => {
  [_Bar, _initClass] = babelHelpers.applyDecs(_class, [], [dec]);
})(), (() => {
  _initClass();
})(), _temp), _Bar);
const foo = new Foo();
