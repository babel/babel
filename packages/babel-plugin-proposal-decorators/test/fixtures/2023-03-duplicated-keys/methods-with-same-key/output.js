var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2303(this, [[dec, 2, "a"], [dec, 2, "a"]], []).e;
  }
  constructor(...args) {
    _initProto(this);
  }
  a() {
    return 1;
  }
  a() {
    return 2;
  }
}
