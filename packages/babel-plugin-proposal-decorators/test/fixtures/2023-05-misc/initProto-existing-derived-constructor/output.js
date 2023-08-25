var _initProto;
const dec = () => {};
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs2305(this, [[dec, 2, "method"]], [], 0, void 0, B).e;
  }
  constructor() {
    let a = 2;
    _initProto(super(a));
    foo();
  }
  method() {}
}
