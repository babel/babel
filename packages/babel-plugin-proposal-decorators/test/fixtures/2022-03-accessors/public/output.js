var _initProto, _init_a, _init_b, _init_computedKey;
const dec = () => {};
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initProto] = babelHelpers.applyDecs2203R(this, [[dec, 1, "a"], [dec, 1, "b"], [dec, 1, 'c']], []).e;
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
  get ['c']() {
    return this.#C;
  }
  set ['c'](v) {
    this.#C = v;
  }
}
