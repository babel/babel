var _computedKey, _computedKey2, _dec, _dec2, _dec3, _dec4, _initStatic;

_dec = dec
_dec2 = dec
_computedKey = 'b'
_dec3 = dec
_computedKey2 = 'b'
_dec4 = dec

class Foo {
  static {
    [_initStatic] = babelHelpers.applyDecs(this, [[_dec, 8, "a"], [_dec2, 9, "a"], [_dec3, 8, _computedKey], [_dec4, 9, _computedKey2]], []);

    _initStatic(this);

  }
  static value = 1;

  static get a() {
    return this.value;
  }

  static set a(v) {
    this.value = v;
  }

  static get [_computedKey]() {
    return this.value;
  }

  static set [_computedKey2](v) {
    this.value = v;
  }

}
