var _initProto, _init_a, _init_extra_a;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _initProto] = babelHelpers.applyDecs2311(this, [], [[dec, 0, "a"], [dec, 2, "a"]]).e;
  }
  constructor() {
    _init_extra_a(this);
  }
  a = (_initProto(this), _init_a(this, 123));
  a() {
    return 1;
  }
}
