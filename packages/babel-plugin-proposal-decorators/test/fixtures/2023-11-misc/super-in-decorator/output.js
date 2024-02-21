class A extends B {
  m() {
    var _initProto, _initClass, _classDecs, _m2Decs;
    _classDecs = [this, super.dec1];
    _m2Decs = [this, super.dec2];
    let _C;
    class C {
      static {
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2311(this, _classDecs, [[_m2Decs, 18, "m2"]], 1));
      }
      constructor() {
        _initProto(this);
      }
      m2() {}
      static {
        _initClass();
      }
    }
  }
}
