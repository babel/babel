class A extends B {
  m() {
    var _initProto, _initClass, _classDecs, _obj, _dec;
    _classDecs = [this, super.dec1];
    _obj = this;
    _dec = super.dec2;
    let _C;
    class C {
      static {
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2305(this, [[[_obj, _dec], 18, "m2"]], _classDecs, 1));
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
