var _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs2301(this, [[dec, 5, "a", o => o.#a, (o, v) => o.#a = v], [dec, 5, "b", o => o.#b, (o, v) => o.#b = v]], []).e;
  }
  static #a = _init_a(this);
  static #b = _init_b(this, 123);
}
