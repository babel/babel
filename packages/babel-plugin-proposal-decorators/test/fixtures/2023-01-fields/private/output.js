let _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs2301(this, [[dec, 0, "a", o => o.#a, (o, v) => o.#a = v], [dec, 0, "b", o => o.#b, (o, v) => o.#b = v]], [], _ => #b in _).e;
  }
  #a = _init_a(this);
  #b = _init_b(this, 123);
}
