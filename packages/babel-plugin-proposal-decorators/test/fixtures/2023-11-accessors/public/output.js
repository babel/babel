var _init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_extra_a, _init_b, _init_extra_b, _init_computedKey, _init_extra_computedKey] = babelHelpers.applyDecs2311(this, [], [[dec, 1, "a"], [dec, 1, "b"], [dec, 1, 'c']]).e;
  }
  constructor() {
    _init_extra_computedKey(this);
  }
  #A = _init_a(this);
  get a() {
    return this.#A;
  }
  set a(v) {
    this.#A = v;
  }
  #B = (_init_extra_a(this), _init_b(this, 123));
  get b() {
    return this.#B;
  }
  set b(v) {
    this.#B = v;
  }
  #C = (_init_extra_b(this), _init_computedKey(this, 456));
  get ['c']() {
    return this.#C;
  }
  set ['c'](v) {
    this.#C = v;
  }
}
