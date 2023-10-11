var _init_a, _init_b, _computedKey, _init_computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2305(this, [[dec, 8, "a"], [dec, 8, "b"], [dec, 8, _computedKey]], []).e;
  }
  static a = _init_a(this);
  static b = _init_b(this, 123);
  static [_computedKey] = _init_computedKey(this, 456);
}
