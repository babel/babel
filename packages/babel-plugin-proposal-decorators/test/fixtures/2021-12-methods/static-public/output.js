var _computedKey, _dec, _dec2, _initStatic;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs(this, [[_dec, 7, "a"], [_dec2, 7, _computedKey]], []);

    _initStatic(this);

  }
  static value = 1;

  static a() {
    return this.value;
  }

  static [_computedKey]() {
    return this.value;
  }

}
