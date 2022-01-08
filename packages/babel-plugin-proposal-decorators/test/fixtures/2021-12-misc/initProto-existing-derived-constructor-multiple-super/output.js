var _initProto, _initProto2;

class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
  }

  constructor() {
    if (Math.random() > 0.5) {
      super(true), _initProto(this), this;
    } else {
      super(false), _initProto(this), this;
    }
  }

  method() {}

}

class C extends B {
  static {
    [_initProto2] = babelHelpers.applyDecs(this, [[deco, 2, "method"]], []);
  }

  constructor() {
    try {
      super((super(), _initProto2(this), this), null.x), _initProto2(this), this;
    } catch {}
  }

  method() {}

}
