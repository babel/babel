var _computedKey, _computedKey2, _dec, _dec2, _dec3, _dec4, _initProto;

_dec = dec
_dec2 = dec
_computedKey = 'b'
_dec3 = dec
_computedKey2 = 'b'
_dec4 = dec

class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);

    _initProto(this);
  }

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

(() => {
  [_initProto] = babelHelpers.applyDecs(Foo, [[_dec, 3, "a"], [_dec2, 4, "a"], [_dec3, 3, _computedKey], [_dec4, 4, _computedKey2]], []);
})();
