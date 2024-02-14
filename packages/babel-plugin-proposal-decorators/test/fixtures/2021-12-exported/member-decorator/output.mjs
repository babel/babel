var _xDecs, _init_x;
_xDecs = dec;
export class A {
  static {
    [_init_x] = babelHelpers.applyDecs(this, [[_xDecs, 0, "x"]], []);
  }
  x = _init_x(this);
}
