var _init_a, _init_b, _computedKey, _init_computedKey, _class;
const dec = () => {};
_computedKey = 'c';
class Foo {}
_class = Foo;
[_init_a, _init_b, _init_computedKey] = babelHelpers.applyDecs2203R(_class, [[dec, 5, "a"], [dec, 5, "b"], [dec, 5, _computedKey]], []).e;
babelHelpers.defineProperty(Foo, "a", _init_a(_class));
babelHelpers.defineProperty(Foo, "b", _init_b(_class, 123));
babelHelpers.defineProperty(Foo, _computedKey, _init_computedKey(_class, 456));
