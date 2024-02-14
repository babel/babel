class A extends B {
  m() {
    var _initProto, _initClass, _obj, _classDecs, _obj2, _m2Decs;
    _obj = this;
    _classDecs = [_obj, super.dec1];
    _obj2 = this;
    _m2Decs = [_obj2, super.dec2];
    let _C;
    class C {
      static {
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2311(this, [[_m2Decs, 18, "m2"]], _classDecs, 1));
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
