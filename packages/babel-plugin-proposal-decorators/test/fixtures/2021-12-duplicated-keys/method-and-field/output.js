var _initProto, _init_a;
const dec = () => {};
class Foo {
  static {
    [_init_a, _initProto] = babelHelpers.applyDecs(this, [[dec, 2, "a"], [dec, 0, "a"]], []);
  }
  a = (_initProto(this), _init_a(this, 123));
  a() {
    return 1;
  }
}
