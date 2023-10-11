var _init_a, _init_b, _computedKey, _init_computedKey, _initProto;
const dec = () => {};
_computedKey = 'c';
class Foo {
  static {
    [_init_a, _init_b, _init_computedKey, _initProto] = babelHelpers.applyDecs2305(this, [[dec, 1, "a"], [dec, 1, "b"], [dec, 1, _computedKey]], []).e;
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
