var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(this, [], [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']]).e;
  }
  static #A = _init_a();
  static get a() {
    return Foo.#A;
  }
  static set a(v) {
    Foo.#A = v;
  }
  static #B = (_init_extra_a(), _init_b(123));
  static get b() {
    return Foo.#B;
  }
  static set b(v) {
    Foo.#B = v;
  }
  static #C = (_init_extra_b(), _init_computedKey(456));
  static get ['c']() {
    return Foo.#C;
  }
  static set ['c'](v) {
    Foo.#C = v;
  }
  static {
    _init_extra_computedKey();
  }
}
