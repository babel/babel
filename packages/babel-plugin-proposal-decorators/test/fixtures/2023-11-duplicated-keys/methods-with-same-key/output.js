var _initProto;
const dec = () => {};
class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 2, "a"], [dec, 2, "a"]]).e;
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
