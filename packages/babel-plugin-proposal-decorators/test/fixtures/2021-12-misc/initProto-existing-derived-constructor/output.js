var _initProto;

class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
  }

  constructor() {
    let a = 2;
    super(a), _initProto(this), this;
    foo();
  }

  method() {}

}
