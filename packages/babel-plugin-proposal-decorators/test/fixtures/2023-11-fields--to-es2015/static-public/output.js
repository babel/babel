var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey, _Foo;
const dec = () => {};
class Foo {}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(_Foo, [[dec, 8, "a"], [dec, 8, "b"], [dec, 8, 'c']], []).e;
babelHelpers.defineProperty(Foo, "a", _init_a(_Foo));
babelHelpers.defineProperty(Foo, "b", (_init_extra_a(_Foo), _init_b(_Foo, 123)));
babelHelpers.defineProperty(Foo, 'c', (_init_extra_b(_Foo), _init_computedKey(_Foo, 456)));
_init_extra_computedKey(_Foo);
