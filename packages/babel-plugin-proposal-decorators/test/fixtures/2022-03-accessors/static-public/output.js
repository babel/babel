var _init_a, _init_b, _computedKey, _init_computedKey, _initStatic;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2203R(this, [[dec, 6, "a"], [dec, 6, "b"], [dec, 6, _computedKey]], []).e;
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
  static get [_computedKey]() {
    return this.#C;
  }
  static set [_computedKey](v) {
    this.#C = v;
  }
}
