var _init_a, _initProto;

class Foo {
  static {
    [_init_a, _initProto] = babelHelpers.applyDecs(this, [[dec, 0, "a"], [dec, 2, "a"]], []);
  }
  a = (_initProto(this), _init_a(this, 123));

  a() {
    return 1;
  }

}
