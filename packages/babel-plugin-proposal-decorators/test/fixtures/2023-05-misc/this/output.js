var _initClass, _obj, _obj2, _classDecs, _obj3, _dec, _obj4, _dec2, _init_x, _obj5, _dec3, _dec4, _init_y;
_obj = o1;
_obj2 = o2;
_classDecs = [_obj, _obj.dec, void 0, dec, _obj2, _obj2.dec];
_obj3 = o2;
_dec = _obj3.dec;
_obj4 = o3.o;
_dec2 = _obj4.dec;
_obj5 = o2;
_dec3 = _obj5.dec;
_dec4 = dec;
let _A;
class A {
  static {
    ({
      e: [_init_x, _init_y],
      c: [_A, _initClass]
    } = babelHelpers.applyDecs2305(this, [[[_obj3, _dec, _obj4, _dec2], 16, "x"], [[_obj5, _dec3, void 0, _dec4], 16, "y"]], _classDecs, 1));
  }
  x = _init_x(this);
  y = _init_y(this);
  static {
    _initClass();
  }
}
