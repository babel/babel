let _initClass, _obj, _classDecs, _xDecs, _init_x, _yDecs, _init_y;
_classDecs = [_obj = o1, _obj.dec, void 0, dec, _obj = o2, _obj.dec];
let _A;
class A {
  static {
    ({
      e: [_init_x, _init_y],
      c: [_A, _initClass]
    } = babelHelpers.applyDecs2305(this, [[_xDecs, 16, "x"], [_yDecs, 16, "y"]], _classDecs, 1));
  }
  [(_xDecs = [_obj = o2, _obj.dec, _obj = o3.o, _obj.dec], _yDecs = [_obj = o2, _obj.dec, void 0, dec], "x")] = _init_x(this);
  y = _init_y(this);
  static {
    _initClass();
  }
}
