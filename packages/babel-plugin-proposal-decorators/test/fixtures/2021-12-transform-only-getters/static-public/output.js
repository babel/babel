var _computedKey, _dec, _dec2, _initStatic;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs(this, [[_dec, 8, "a"], [_dec2, 8, _computedKey]], []);

    _initStatic(this);

  }
  static value = 1;

  static get a() {
    return this.value;
  }

  static get [_computedKey]() {
    return this.value;
  }

}
