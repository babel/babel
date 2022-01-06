var _computedKey, _dec, _dec2, _initProto;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_dec, 3, "a"], [_dec2, 3, _computedKey]], []);
  }

  constructor(...args) {
    _initProto(this);
  }

  value = 1;

  get a() {
    return this.value;
  }

  get [_computedKey]() {
    return this.value;
  }

}
