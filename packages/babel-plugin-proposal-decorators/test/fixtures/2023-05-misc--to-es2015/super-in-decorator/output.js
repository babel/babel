class A extends B {
  m() {
    var _initProto, _initClass, _classDecs, _obj, _dec, _C2;
    _classDecs = [this, super.dec1];
    _obj = this;
    _dec = super.dec2;
    let _C;
    class C {
      constructor() {
        _initProto(this);
      }
      m2() {}
    }
    _C2 = C;
    ({
      e: [_initProto],
      c: [_C, _initClass]
    } = babelHelpers.applyDecs2305(_C2, [[[_obj, _dec], 18, "m2"]], _classDecs, 1));
    _initClass();
  }
}
