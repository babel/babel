let _xDecs, _init_x;
export class A {
  static {
    [_init_x] = babelHelpers.applyDecs2301(this, [[_xDecs, 0, "x"]], []).e;
  }
  [(_xDecs = dec, "x")] = _init_x(this);
}
