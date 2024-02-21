var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(this, [], [[dec, 8, "a"], [dec, 8, "b"], [dec, 8, 'c']]).e;
  }
  static a = _init_a();
  static b = (_init_extra_a(), _init_b(123));
  static ['c'] = (_init_extra_b(), _init_computedKey(456));
  static {
    _init_extra_computedKey();
  }
}
