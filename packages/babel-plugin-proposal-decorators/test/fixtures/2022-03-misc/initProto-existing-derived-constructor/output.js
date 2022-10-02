var _initProto;
const dec = () => {};
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs2203(this, [[dec, 2, "method"]], []);
  }
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
