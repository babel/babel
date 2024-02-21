var _init_a, _init_extra_a, _init_b, _init_extra_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b] = babelHelpers.applyDecs2311(this, [], [[dec, 0, "a", o => o.#a, (o, v) => o.#a = v], [dec, 0, "b", o => o.#b, (o, v) => o.#b = v]], 0, _ => #b in _).e;
  }
  constructor() {
    _init_extra_b(this);
  }
  #a = _init_a(this);
  #b = (_init_extra_a(this), _init_b(this, 123));
}
