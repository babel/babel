var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 2, "a"], [dec, 2, "a"]], []);
  }
  constructor() {
    _initProto(this);
  }
  a() {
    return 1;
  }
  a() {
    return 2;
  }
}
