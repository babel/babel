var _computedKey, _computedKey2, _dec, _dec2, _dec3, _dec4, _initProto;

_dec = dec
_dec2 = dec
_computedKey = 'b'
_dec3 = dec
_computedKey2 = 'b'
_dec4 = dec

class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_dec, 3, "a"], [_dec2, 4, "a"], [_dec3, 3, _computedKey], [_dec4, 4, _computedKey2]], []);
  }

  constructor(...args) {
    _initProto(this);
  }

  value = 1;

  get a() {
    return this.value;
  }

  set a(v) {
    this.value = v;
  }

  get [_computedKey]() {
    return this.value;
  }

  set [_computedKey2](v) {
    this.value = v;
  }

}
