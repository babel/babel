var _initProto, _super;

class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
  }

  constructor() {
    let a = 2;
    _super = super(a), _initProto(this), _super;
    foo();
  }

  method() {}

}
