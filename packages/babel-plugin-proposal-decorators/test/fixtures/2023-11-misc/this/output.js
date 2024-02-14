var _initClass, _obj, _obj2, _obj3, _classDecs, _obj4, _obj5, _obj6, _xDecs, _init_x, _init_extra_x, _obj7, _yDecs, _init_y, _init_extra_y;
_classDecs = [_obj = o1, _obj.dec, void 0, dec, _obj2 = o2, _obj2.dec, _obj3 = o4.o(), _obj3.dec];
_xDecs = [_obj4 = o2, _obj4.dec, _obj5 = o3.o, _obj5.dec, _obj6 = o4.o(), _obj6.dec];
_yDecs = [_obj7 = o2, _obj7.dec, void 0, dec];
let _A;
class A {
  static {
    ({
      e: [_init_x, _init_extra_x, _init_y, _init_extra_y],
      c: [_A, _initClass]
    } = babelHelpers.applyDecs2311(this, [[_xDecs, 16, "x"], [_yDecs, 16, "y"]], _classDecs, 1));
  }
  constructor() {
    _init_extra_y(this);
  }
  x = _init_x(this);
  y = (_init_extra_x(this), _init_y(this));
  static {
    _initClass();
  }
}
