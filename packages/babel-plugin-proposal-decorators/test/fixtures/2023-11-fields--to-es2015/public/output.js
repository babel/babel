var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey, _Foo;
const dec = () => {};
class Foo {
  constructor() {
    babelHelpers.defineProperty(this, "a", _init_a(this));
    babelHelpers.defineProperty(this, "b", (_init_extra_a(this), _init_b(this, 123)));
    babelHelpers.defineProperty(this, 'c', (_init_extra_b(this), _init_computedKey(this, 456)));
    _init_extra_computedKey(this);
  }
}
_Foo = Foo;
[_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 0, "a"], [dec, 0, "b"], [dec, 0, 'c']]).e;
