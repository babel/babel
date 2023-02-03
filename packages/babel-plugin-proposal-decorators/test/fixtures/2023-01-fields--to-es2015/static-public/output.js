var _init_a, _init_b, _computedKey, _init_computedKey;
const dec = () => {};
_computedKey = 'c';
class Foo {}
[_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2301(Foo, [[dec, 5, "a"], [dec, 5, "b"], [dec, 5, _computedKey]], []).e;
babelHelpers.defineProperty(Foo, "a", _init_a(Foo));
babelHelpers.defineProperty(Foo, "b", _init_b(Foo, 123));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey(Foo, 456));
