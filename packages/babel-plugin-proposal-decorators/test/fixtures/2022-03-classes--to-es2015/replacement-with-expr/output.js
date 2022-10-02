var _initClass, _Bar, _class;
const dec = () => {};
const Foo = ((_class = class Bar {
  constructor() {
    babelHelpers.defineProperty(this, "bar", new _Bar());
  }
}, [_Bar, _initClass] = babelHelpers.applyDecs2203(_class, [], [dec]), _initClass()), _Bar);
const foo = new Foo();
