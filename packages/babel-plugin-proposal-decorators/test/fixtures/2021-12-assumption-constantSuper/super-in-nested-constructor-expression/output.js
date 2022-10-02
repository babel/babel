var _initClass;
const dec = () => {};
let _Foo;
class Foo extends Bar {
  static {
    [_Foo, _initClass] = babelHelpers.applyDecs(this, [], [dec]);
  }
  constructor() {
    let foo = super();
  }
  static {
    _initClass();
  }
}
