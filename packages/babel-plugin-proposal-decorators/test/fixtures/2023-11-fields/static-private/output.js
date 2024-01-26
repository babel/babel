var _init_a, _init_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b] = babelHelpers.applyDecs2305(this, [[dec, 8, "a", o => o.#a, (o, v) => o.#a = v], [dec, 8, "b", o => o.#b, (o, v) => o.#b = v]], []).e;
  }
  static #a = _init_a(this);
  static #b = _init_b(this, 123);
}
