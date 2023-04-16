class A extends B {
  m() {
    var _initClass, _obj, _dec, _obj2, _dec2, _initProto;
    let _C;
    _obj = this;
    _dec = super.dec1;
    _obj2 = this;
    _dec2 = super.dec2;
    class C {
      static {
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2303(this, [[[1, _obj2, _dec2], 2, "m2"]], [1, _obj, _dec]));
      }
      constructor(...args) {
        _initProto(this);
      }
      m2() {}
      static {
        _initClass();
      }
    }
  }
}
