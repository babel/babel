var _computedKey, _dec, _dec2, _initProto;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_dec, 2, "a"], [_dec2, 2, _computedKey]], []);
  }

  constructor(...args) {
    _initProto(this);
  }

  value = 1;

  a() {
    return this.value;
  }

  [_computedKey]() {
    return this.value;
  }

}
