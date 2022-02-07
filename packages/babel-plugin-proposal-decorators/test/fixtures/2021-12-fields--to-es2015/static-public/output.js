var _init_a, _init_b, _computedKey, _init_computedKey, _dec, _dec2, _dec3;

_dec = dec
_dec2 = dec
_computedKey = 'c'
_dec3 = dec

class Foo {}

(() => {
  [_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs(Foo, [[_dec, 5, "a"], [_dec2, 5, "b"], [_dec3, 5, _computedKey]], []);
})();

babelHelpers.defineProperty(Foo, "a", _init_a(Foo));
babelHelpers.defineProperty(Foo, "b", _init_b(Foo, 123));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey(Foo, 456));
