var _initStatic, _init_a, _init_b, _init_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2301(this, [[dec, 6, "a"], [dec, 6, "b"], [dec, 6, 'c']], []).e;
    _initStatic(this);
  }
  static #A = _init_a(this);
  static get a() {
    return this.#A;
  }
  static set a(v) {
    this.#A = v;
  }
  static #B = _init_b(this, 123);
  static get b() {
    return this.#B;
  }
  static set b(v) {
    this.#B = v;
  }
  static #C = _init_computedKey(this, 456);
  static get ['c']() {
    return this.#C;
  }
  static set ['c'](v) {
    this.#C = v;
  }
}
