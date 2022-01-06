var _computedKey, _computedKey2, _dec, _dec2, _initProto;

_computedKey = getKey()
_dec = dec
_computedKey2 = getKey()
_dec2 = dec

class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_dec, 2, _computedKey], [_dec2, 2, _computedKey2]], []);
  }

  constructor(...args) {
    _initProto(this);
  }

  [_computedKey]() {
    return 1;
  }

  [_computedKey2]() {
    return 2;
  }

}
