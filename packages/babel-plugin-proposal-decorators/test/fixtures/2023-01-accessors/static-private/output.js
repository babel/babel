let _initStatic, _init_a, _get_a, _set_a, _init_b, _get_b, _set_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _get_a, _set_a, _init_b, _get_b, _set_b, _initStatic] = babelHelpers.applyDecs2301(this, [[dec, 6, "a", o => o.#A, (o, v) => o.#A = v], [dec, 6, "b", o => o.#B, (o, v) => o.#B = v]], []).e;
    _initStatic(this);
  }
  static #A = _init_a(this);
  static set #a(v) {
    _set_a(this, v);
  }
  static get #a() {
    return _get_a(this);
  }
  static #B = _init_b(this, 123);
  static set #b(v) {
    _set_b(this, v);
  }
  static get #b() {
    return _get_b(this);
  }
}
