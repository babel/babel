var _dec, _init_x;
_dec = dec;
export class A {
  static {
    [_init_x] = babelHelpers.applyDecs(this, [[_dec, 0, "x"]], []);
  }
  x = _init_x(this);
}
