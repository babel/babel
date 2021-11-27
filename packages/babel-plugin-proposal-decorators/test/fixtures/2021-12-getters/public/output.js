var _computedKey, _dec, _dec2, _initProto;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);

    _initProto(this);
  }

  get a() {
    return this.value;
  }

  get [_computedKey]() {
    return this.value;
  }

}

(() => {
  [_initProto] = babelHelpers.applyDecs(Foo, [[_dec, 3, "a"], [_dec2, 3, _computedKey]], []);
})();
