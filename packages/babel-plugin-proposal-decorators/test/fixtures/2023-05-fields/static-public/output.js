let _init_a, _init_b, _init_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2305(this, [[dec, 8, "a"], [dec, 8, "b"], [dec, 8, 'c']], []).e;
  }
  static a = _init_a(this);
  static b = _init_b(this, 123);
  static ['c'] = _init_computedKey(this, 456);
}
