var _init_a, _init_extra_a, _init_b, _init_extra_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b] = babelHelpers.applyDecs2311(this, [], [[dec, 8, "a", o => o.#a, (o, v) => o.#a = v], [dec, 8, "b", o => o.#b, (o, v) => o.#b = v]]).e;
  }
  static #a = _init_a();
  static #b = (_init_extra_a(), _init_b(123));
  static {
    _init_extra_b();
  }
}
