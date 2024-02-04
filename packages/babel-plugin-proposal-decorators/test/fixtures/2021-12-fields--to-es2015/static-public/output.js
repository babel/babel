var _init_a, _init_b, _init_computedKey, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs(_Foo, [[dec, 5, "a"], [dec, 5, "b"], [dec, 5, 'c']], []);
babelHelpers.defineProperty(Foo, "a", _init_a(_Foo));
babelHelpers.defineProperty(Foo, "b", _init_b(_Foo, 123));
babelHelpers.defineProperty(Foo, 'c', _init_computedKey(_Foo, 456));
