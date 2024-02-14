var _initClass, _obj, _classDecs, _obj2, _xDecs, _init_x, _init_extra_x, _obj3, _yDecs, _init_y, _init_extra_y, _A2;
_classDecs = [_obj = o1, _obj.dec, void 0, dec, _obj = o2, _obj.dec];
_xDecs = [_obj2 = o2, _obj2.dec, _obj2 = o3.o, _obj2.dec];
_yDecs = [_obj3 = o2, _obj3.dec, void 0, dec];
let _A;
class A {
  constructor() {
    babelHelpers.defineProperty(this, "x", _init_x(this));
    babelHelpers.defineProperty(this, "y", (_init_extra_x(this), _init_y(this)));
    _init_extra_y(this);
  }
}
_A2 = A;
({
  e: [_init_x, _init_extra_x, _init_y, _init_extra_y],
  c: [_A, _initClass]
} = babelHelpers.applyDecs2311(_A2, [[_xDecs, 16, "x"], [_yDecs, 16, "y"]], _classDecs, 1));
_initClass();
