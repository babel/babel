var _xDecs, _init_x, _init_extra_x;
_xDecs = dec;
export class A {
  static {
    [_init_x, _init_extra_x] = babelHelpers.applyDecs2311(this, [[_xDecs, 0, "x"]], []).e;
  }
  constructor() {
    _init_extra_x(this);
  }
  x = _init_x(this);
}
