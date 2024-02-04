var _initProto, _dec, _initProto2, _dec2;
const dec = () => {};
_dec = deco;
class A extends B {
  static {
    [_initProto] = babelHelpers.applyDecs2203R(this, [[_dec, 2, "method"]], []).e;
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
_dec2 = deco;
class C extends B {
  static {
    [_initProto2] = babelHelpers.applyDecs2203R(this, [[_dec2, 2, "method"]], []).e;
  }
  constructor() {
    try {
      _initProto2(super(_initProto2(super()), null.x));
    } catch {}
  }
  method() {}
}
