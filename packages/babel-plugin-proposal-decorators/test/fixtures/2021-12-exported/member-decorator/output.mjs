var _xDecs, _init_x;
export class A {
  static {
    _xDecs = dec;
    [_init_x] = babelHelpers.applyDecs(this, [[_xDecs, 0, "x"]], []);
  }
  x = _init_x(this);
}
