var _initProto, _methodDecs, _initProto2, _methodDecs2;
const dec = () => {};
_methodDecs = deco;
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_methodDecs, 2, "method"]], []);
  }
  constructor() {
    if (Math.random() > 0.5) {
      _initProto(super(true));
    } else {
      _initProto(super(false));
    }
  }
  method() {}
}
_methodDecs2 = deco;
class C extends B {
  static {
    [_initProto2] = babelHelpers.applyDecs(this, [[_methodDecs2, 2, "method"]], []);
  }
  constructor() {
    try {
      _initProto2(super(_initProto2(super()), null.x));
    } catch {}
  }
  method() {}
}
