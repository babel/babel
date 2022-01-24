var _init_a, _init_b, _computedKey, _init_computedKey, _dec, _dec2, _dec3, _initStatic;

_dec = dec
_dec2 = dec
_computedKey = 'c'
_dec3 = dec

class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initStatic] = babelHelpers.applyDecs(this, [[_dec, 6, "a"], [_dec2, 6, "b"], [_dec3, 6, _computedKey]], []);

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
