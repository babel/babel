var _computedKey, _dec, _dec2, _initStatic;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static a() {
    return this.value;
  }

  static [_computedKey]() {
    return this.value;
  }

}

(() => {
  [_initStatic] = babelHelpers.applyDecs(Foo, [[_dec, 7, "a"], [_dec2, 7, _computedKey]], []);

  _initStatic(Foo);
})();

babelHelpers.defineProperty(Foo, "value", 1);
