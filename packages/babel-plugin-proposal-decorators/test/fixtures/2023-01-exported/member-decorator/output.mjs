var _xDecs, _init_x;
export class A {
  static {
    _xDecs = dec;
    [_init_x] = babelHelpers.applyDecs2301(this, [[_xDecs, 0, "x"]], []).e;
  }
  x = _init_x(this);
}
