var _initProto;
const dec = () => {};
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[dec, 2, "method"]], []);
  }
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
