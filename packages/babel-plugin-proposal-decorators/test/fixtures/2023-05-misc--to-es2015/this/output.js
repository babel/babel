var _initClass, _obj, _obj2, _classDecs, _obj3, _obj4, _xDecs, _init_x, _obj5, _yDecs, _init_y, _A2;
_obj = o1;
_obj2 = o2;
_classDecs = [_obj, _obj.dec, void 0, dec, _obj2, _obj2.dec];
_obj3 = o2;
_obj4 = o3.o;
_xDecs = [_obj3, _obj3.dec, _obj4, _obj4.dec];
_obj5 = o2;
_yDecs = [_obj5, _obj5.dec, void 0, dec];
let _A;
class A {
  constructor() {
    babelHelpers.defineProperty(this, "x", _init_x(this));
    babelHelpers.defineProperty(this, "y", _init_y(this));
  }
}
_A2 = A;
({
  e: [_init_x, _init_y],
  c: [_A, _initClass]
} = babelHelpers.applyDecs2305(_A2, [[_xDecs, 16, "x"], [_yDecs, 16, "y"]], _classDecs, 1));
_initClass();
