var _init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b] = babelHelpers.applyDecs2311(this, [[dec, 9, "a", o => o.#A, (o, v) => o.#A = v], [dec, 9, "b", o => o.#B, (o, v) => o.#B = v]], []).e;
  }
  static #A = _init_a(this);
  set #a(v) {
    _set_a(this, v);
  }
  get #a() {
    return _get_a(this);
  }
  static #B = (_init_extra_a(this), _init_b(this, 123));
  set #b(v) {
    _set_b(this, v);
  }
  get #b() {
    return _get_b(this);
  }
  static {
    _init_extra_b(this);
  }
}
