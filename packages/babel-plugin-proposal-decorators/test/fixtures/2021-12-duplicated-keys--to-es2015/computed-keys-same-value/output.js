var _computedKey, _computedKey2, _dec, _dec2, _initProto;

_computedKey = getKeyI()
_dec = dec
_computedKey2 = getKeyJ()
_dec2 = dec

class Foo {
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

(() => {
  [_initProto] = babelHelpers.applyDecs(Foo, [[_dec, 2, _computedKey], [_dec2, 2, _computedKey2]], []);
})();
