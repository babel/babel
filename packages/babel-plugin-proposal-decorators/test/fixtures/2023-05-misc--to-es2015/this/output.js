var _A2;
let _initClass, _obj, _classDecs, _xDecs, _init_x, _yDecs, _init_y, _ref;
_classDecs = [_obj = o1, _obj.dec, void 0, dec, _obj = o2, _obj.dec];
let _A;
_ref = (_xDecs = [_obj = o2, _obj.dec, _obj = o3.o, _obj.dec], _yDecs = [_obj = o2, _obj.dec, void 0, dec], "x");
class A {
  constructor() {
    babelHelpers.defineProperty(this, _ref, _init_x(this));
    babelHelpers.defineProperty(this, "y", _init_y(this));
  }
}
_A2 = A;
({
  e: [_init_x, _init_y],
  c: [_A, _initClass]
} = babelHelpers.applyDecs2305(_A2, [[_xDecs, 16, "x"], [_yDecs, 16, "y"]], _classDecs, 1));
_initClass();
