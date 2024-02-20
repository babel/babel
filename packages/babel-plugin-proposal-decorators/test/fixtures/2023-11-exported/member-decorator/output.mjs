var _init_x, _init_extra_x;
export class A {
  static {
    [_init_x, _init_extra_x] = babelHelpers.applyDecs2311(this, [], [[dec, 0, "x"]]).e;
  }
  constructor() {
    _init_extra_x(this);
  }
  x = _init_x(this);
}
