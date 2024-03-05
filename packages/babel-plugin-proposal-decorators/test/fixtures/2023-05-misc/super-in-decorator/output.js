class A extends B {
  m() {
    var _initProto, _initClass, _classDecs, _m2Decs, _outerThis, _outerSuperProp;
    _classDecs = [this, super.dec1];
    _outerThis = this;
    _outerSuperProp = prop => Object.defineProperty({}, "_", {
      get: () => super[prop],
      set: v => super[prop] = v
    });
    let _C;
    class C {
      static {
        _m2Decs = [_outerThis, _outerSuperProp("dec2")._];
        ({
          e: [_initProto],
          c: [_C, _initClass]
        } = babelHelpers.applyDecs2305(this, [[_m2Decs, 18, "m2"]], _classDecs, 1));
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
