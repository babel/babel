var _computedKey, _dec, _dec2, _initProto;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  constructor(...args) {
    babelHelpers.defineProperty(this, "value", 1);

    _initProto(this);
  }

  set a(v) {
    return this.value = v;
  }

  set [_computedKey](v) {
    return this.value = v;
  }

}

(() => {
  [_initProto] = babelHelpers.applyDecs(Foo, [[_dec, 4, "a"], [_dec2, 4, _computedKey]], []);
})();
