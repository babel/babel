var _init_a, _init_b, _computedKey, _init_computedKey, _dec, _dec2, _dec3, _initProto;

_dec = dec
_dec2 = dec
_computedKey = 'c'
_dec3 = dec

class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initProto] = babelHelpers.applyDecs(this, [[_dec, 1, "a"], [_dec2, 1, "b"], [_dec3, 1, _computedKey]], []);
  }
  #A = (_initProto(this), _init_a(this));

  get a() {
    return this.#A;
  }

  set a(v) {
    this.#A = v;
  }

  #B = _init_b(this, 123);

  get b() {
    return this.#B;
  }

  set b(v) {
    this.#B = v;
  }

  #C = _init_computedKey(this, 456);

  get [_computedKey]() {
    return this.#C;
  }

  set [_computedKey](v) {
    this.#C = v;
  }

}
