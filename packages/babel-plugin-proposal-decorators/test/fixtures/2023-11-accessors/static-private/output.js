var _init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b;
const dec = () => {};
class Foo {
  static {
    [_init_a, _get_a, _set_a, _init_extra_a, _init_b, _get_b, _set_b, _init_extra_b] = babelHelpers.applyDecs2311(this, [], [[dec, 9, "a", o => o.#A, (o, v) => o.#A = v], [dec, 9, "b", o => o.#B, (o, v) => o.#B = v]]).e;
  }
  static #A = _init_a();
  static set #a(v) {
    _set_a(v);
  }
  static get #a() {
    return _get_a();
  }
  static #B = (_init_extra_a(), _init_b(123));
  static set #b(v) {
    _set_b(v);
  }
  static get #b() {
    return _get_b();
  }
  static {
    _init_extra_b();
  }
}
