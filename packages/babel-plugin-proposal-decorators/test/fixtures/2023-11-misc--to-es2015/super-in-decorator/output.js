class A extends B {
  m() {
    var _initProto, _initClass, _classDecs, _m2Decs, _C2;
    _classDecs = [this, super.dec1];
    _m2Decs = [this, super.dec2];
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
    } = babelHelpers.applyDecs2311(_C2, _classDecs, [[_m2Decs, 18, "m2"]], 1));
    _initClass();
  }
}
