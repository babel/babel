var _initStatic, _init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _computedKey, _init_computedKey7;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => (logs.push("calling toPrimitive"), "f()")
  };
};
_computedKey = babelHelpers.toPropertyKey(f());
class Foo {
  static {
    [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2203R(this, [[dec, 6, "a"], [dec, 6, "a", function () {
      return this.#B;
    }, function (value) {
      this.#B = value;
    }], [dec, 6, "b"], [dec, 6, "c"], [dec, 6, 0], [dec, 6, 1], [dec, 6, 2n], [dec, 6, 3n], [dec, 6, _computedKey]], []).e;
    _initStatic(this);
  }
  static #A = _init_a(this);
  static get a() {
    return this.#A;
  }
  static set a(v) {
    this.#A = v;
  }
  static #B = _init_a2(this);
  set #a(v) {
    _set_a(this, v);
  }
  get #a() {
    return _get_a(this);
  }
  static #C = _init_computedKey(this);
  static get "b"() {
    return this.#C;
  }
  static set "b"(v) {
    this.#C = v;
  }
  static #D = _init_computedKey2(this);
  static get ["c"]() {
    return this.#D;
  }
  static set ["c"](v) {
    this.#D = v;
  }
  static #E = _init_computedKey3(this);
  static get 0() {
    return this.#E;
  }
  static set 0(v) {
    this.#E = v;
  }
  static #F = _init_computedKey4(this);
  static get [1]() {
    return this.#F;
  }
  static set [1](v) {
    this.#F = v;
  }
  static #G = _init_computedKey5(this);
  static get 2n() {
    return this.#G;
  }
  static set 2n(v) {
    this.#G = v;
  }
  static #H = _init_computedKey6(this);
  static get [3n]() {
    return this.#H;
  }
  static set [3n](v) {
    this.#H = v;
  }
  static #I = _init_computedKey7(this);
  static get [_computedKey]() {
    return this.#I;
  }
  static set [_computedKey](v) {
    this.#I = v;
  }
}
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
