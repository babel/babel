class A extends B {
  m() {
    var _C2;
    let _initProto, _initClass, _classDecs, _m2Decs, _ref;
    _classDecs = [this, super.dec1];
    let _C;
    _ref = (_m2Decs = [this, super.dec2], "m2");
    class C {
      constructor() {
        _initProto(this);
      }
      [_ref]() {}
    }
    _C2 = C;
    ({
      e: [_initProto],
      c: [_C, _initClass]
    } = babelHelpers.applyDecs2305(_C2, [[_m2Decs, 18, "m2"]], _classDecs, 1));
    _initClass();
  }
}
