var _initStatic, _init_a, _init_b, _init_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2305(this, [[dec, 9, "a"], [dec, 9, "b"], [dec, 9, 'c']], []).e;
    _initStatic(this);
  }
  static #A = _init_a(this);
  static get a() {
    return Foo.#A;
  }
  static set a(v) {
    Foo.#A = v;
  }
  static #B = _init_b(this, 123);
  static get b() {
    return Foo.#B;
  }
  static set b(v) {
    Foo.#B = v;
  }
  static #C = _init_computedKey(this, 456);
  static get ['c']() {
    return Foo.#C;
  }
  static set ['c'](v) {
    Foo.#C = v;
  }
}
