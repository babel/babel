var _init_a, _init_b, _computedKey, _init_computedKey, _initStatic;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs2303(this, [[[0, dec], 6, "a"], [[0, dec], 6, "b"], [[0, dec], 6, _computedKey]], []).e;
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
  static get [_computedKey]() {
    return Foo.#C;
  }
  static set [_computedKey](v) {
    Foo.#C = v;
  }
}
