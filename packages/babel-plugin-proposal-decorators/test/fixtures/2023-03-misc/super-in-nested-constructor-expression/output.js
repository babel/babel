var _initClass;
const dec = () => {};
let _Foo;
class Foo extends Bar {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs2303(this, [], [0, dec]).c;
  }
  constructor() {
    let foo = super();
  }
  static {
    _initClass();
  }
}
