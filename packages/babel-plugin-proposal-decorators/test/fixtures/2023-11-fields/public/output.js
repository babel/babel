var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(this, [], [[dec, 0, "a"], [dec, 0, "b"], [dec, 0, 'c']]).e;
  }
  constructor() {
    _init_extra_computedKey(this);
  }
  a = _init_a(this);
  b = (_init_extra_a(this), _init_b(this, 123));
  ['c'] = (_init_extra_b(this), _init_computedKey(this, 456));
}
