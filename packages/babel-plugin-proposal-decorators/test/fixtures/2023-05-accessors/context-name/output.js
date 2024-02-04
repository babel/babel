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
    [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2305(this, [[dec, 9, "a"], [dec, 9, "a", o => o.#B, (o, v) => o.#B = v], [dec, 9, "b"], [dec, 9, "c"], [dec, 9, 0], [dec, 9, 1], [dec, 9, 2n], [dec, 9, 3n], [dec, 9, _computedKey]], []).e;
    _initStatic(this);
  }
  static #A = _init_a(this);
  static get a() {
    return Foo.#A;
  }
  static set a(v) {
    Foo.#A = v;
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
    return Foo.#C;
  }
  static set "b"(v) {
    Foo.#C = v;
  }
  static #D = _init_computedKey2(this);
  static get ["c"]() {
    return Foo.#D;
  }
  static set ["c"](v) {
    Foo.#D = v;
  }
  static #E = _init_computedKey3(this);
  static get 0() {
    return Foo.#E;
  }
  static set 0(v) {
    Foo.#E = v;
  }
  static #F = _init_computedKey4(this);
  static get [1]() {
    return Foo.#F;
  }
  static set [1](v) {
    Foo.#F = v;
  }
  static #G = _init_computedKey5(this);
  static get 2n() {
    return Foo.#G;
  }
  static set 2n(v) {
    Foo.#G = v;
  }
  static #H = _init_computedKey6(this);
  static get [3n]() {
    return Foo.#H;
  }
  static set [3n](v) {
    Foo.#H = v;
  }
  static #I = _init_computedKey7(this);
  static get [_computedKey]() {
    return Foo.#I;
  }
  static set [_computedKey](v) {
    Foo.#I = v;
  }
}
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
