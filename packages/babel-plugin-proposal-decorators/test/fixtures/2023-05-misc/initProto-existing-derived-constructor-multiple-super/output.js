var _initProto, _dec, _B, _initProto2, _dec2, _B2;
const dec = () => {};
_dec = deco;
class A extends (_B = B) {
  static {
    [_initProto] = babelHelpers.applyDecs2305(this, [[_dec, 2, "method"]], [], 0, void 0, _B).e;
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
class C extends (_B2 = B) {
  static {
    [_initProto2] = babelHelpers.applyDecs2305(this, [[_dec2, 2, "method"]], [], 0, void 0, _B2).e;
  }
  constructor() {
    try {
      _initProto2(super(_initProto2(super()), null.x));
    } catch {}
  }
  method() {}
}
