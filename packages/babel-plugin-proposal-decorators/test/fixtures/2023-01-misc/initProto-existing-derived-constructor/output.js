var _initProto;
const dec = () => {};
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs2301(this, [[dec, 2, "method"]], []).e;
  }
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
