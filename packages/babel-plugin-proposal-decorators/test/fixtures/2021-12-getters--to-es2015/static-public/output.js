var _computedKey, _dec, _dec2, _initStatic;

_dec = dec
_computedKey = 'b'
_dec2 = dec

class Foo {
  static get a() {
    return this.value;
  }

  static get [_computedKey]() {
    return this.value;
  }

}

(() => {
  [_initStatic] = babelHelpers.applyDecs(Foo, [[_dec, 8, "a"], [_dec2, 8, _computedKey]], []);

  _initStatic(Foo);
})();

babelHelpers.defineProperty(Foo, "value", 1);
