var _initProto;

class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
  }

  constructor() {
    var _super;

    if (Math.random() > 0.5) {
      _super = super(true), _initProto(this), _super;
    } else {
      super(false);
    }
  }

  method() {}

}
