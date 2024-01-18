var _initClass, _Bar, _Bar2;
const dec = () => {};
const Foo = ((_Bar2 = class Bar {
  constructor() {
    babelHelpers.defineProperty(this, "bar", new _Bar());
  }
}, [_Bar, _initClass] = babelHelpers.applyDecs2301(_Bar2, [], [dec]).c, _initClass()), _Bar);
const foo = new Foo();
