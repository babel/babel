var _init_a, _init_b, _computedKey, _init_computedKey, _dec, _dec2, _dec3;

_dec = dec
_dec2 = dec
_computedKey = 'c'
_dec3 = dec

class Foo {
  static {
    [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs(this, [[_dec, 5, "a"], [_dec2, 5, "b"], [_dec3, 5, _computedKey]], []);
  }
  static a = _init_a(this);
  static b = _init_b(this, 123);
  static [_computedKey] = _init_computedKey(this, 456);
}
