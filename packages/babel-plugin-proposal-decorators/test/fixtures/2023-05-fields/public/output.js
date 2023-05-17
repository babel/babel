var _init_a, _init_b, _computedKey, _init_computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2305(this, [[dec, 0, "a"], [dec, 0, "b"], [dec, 0, _computedKey]], []).e;
  }
  a = _init_a(this);
  b = _init_b(this, 123);
  [_computedKey] = _init_computedKey(this, 456);
}
