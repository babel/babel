var _init_a, _init_b, _init_computedKey, _class;
const dec = () => {};
class Foo {}
_class = Foo;
[_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2305(_class, [[dec, 8, "a"], [dec, 8, "b"], [dec, 8, 'c']], []).e;
babelHelpers.defineProperty(Foo, "a", _init_a(_class));
babelHelpers.defineProperty(Foo, "b", _init_b(_class, 123));
babelHelpers.defineProperty(Foo, 'c', _init_computedKey(_class, 456));
