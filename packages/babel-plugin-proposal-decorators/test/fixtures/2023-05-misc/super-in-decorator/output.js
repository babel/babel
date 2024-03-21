class A extends B {
  m() {
    let _initProto, _initClass, _classDecs, _m2Decs;
    _classDecs = [this, super.dec1];
    let _C;
    class C {
      static {
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2305(this, [[_m2Decs, 18, "m2"]], _classDecs, 1));
      }
      constructor() {
        _initProto(this);
      }
      [(_m2Decs = [this, super.dec2], "m2")]() {}
      static {
        _initClass();
      }
    }
  }
}
