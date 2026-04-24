let _initProto, _init_d, _init_extra_d;
abstract class A {
  static {
    [_init_d, _init_extra_d, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec2, 0, "d"], [dec1, 2, "method"]]).e;
  }
  abstract a;
  declare b;
  c = void _initProto(this);
  d = _init_d(this);
  abstract e;
  declare f;
  g = void _init_extra_d(this);
  method() {}
}
