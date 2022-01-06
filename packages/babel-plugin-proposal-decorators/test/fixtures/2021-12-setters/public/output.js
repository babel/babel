var _computedKey, _dec, _dec2, _initProto;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static {
    [_initProto] = babelHelpers.applyDecs(this, [[_dec, 4, "a"], [_dec2, 4, _computedKey]], []);
  }

  constructor(...args) {
    _initProto(this);
  }

  value = 1;

  set a(v) {
    return this.value = v;
  }

  set [_computedKey](v) {
    return this.value = v;
  }

}
