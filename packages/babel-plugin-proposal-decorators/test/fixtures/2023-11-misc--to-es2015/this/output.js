var _initClass, _obj, _init_x, _init_extra_x, _init_y, _init_extra_y, _A2;
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
} = babelHelpers.applyDecs2311(_A2, [_obj = o1, _obj.dec, void 0, dec, _obj = o2, _obj.dec], [[[_obj = o2, _obj.dec, _obj = o3.o, _obj.dec], 16, "x"], [[_obj = o2, _obj.dec, void 0, dec], 16, "y"]], 1));
_initClass();
