var _init_a, _init_b, _computedKey, _init_computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2303(this, [[[0, dec], 0, "a"], [[0, dec], 0, "b"], [[0, dec], 0, _computedKey]], []).e;
  }
  a = _init_a(this);
  b = _init_b(this, 123);
  [_computedKey] = _init_computedKey(this, 456);
}
