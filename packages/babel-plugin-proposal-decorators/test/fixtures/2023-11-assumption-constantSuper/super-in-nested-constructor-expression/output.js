var _initClass, _Bar;
const dec = () => {};
let _Foo;
class Foo extends (_Bar = Bar) {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs2311(this, [dec], [], 0, void 0, _Bar).c;
  }
  constructor() {
    let foo = super();
  }
  static {
    _initClass();
  }
}
