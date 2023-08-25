var _initClass;
const dec = () => {};
let _Foo;
class Foo extends Bar {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs2305(this, [], [dec], 0, void 0, Bar).c;
  }
  constructor() {
    let foo = super();
  }
  static {
    _initClass();
  }
}
