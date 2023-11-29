var _init_a, _init_a2, _get_a, _set_a, _init_computedKey, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init_computedKey5, _computedKey3, _init_computedKey6, _computedKey4, _init_computedKey7, _initStatic;
const logs = [];
const dec = (value, context) => {
  logs.push(context.name);
};
const f = () => {
  logs.push("computing f");
  return {
    [Symbol.toPrimitive]: () => "f()"
  };
};
_computedKey = "c";
_computedKey2 = 1;
_computedKey3 = 3n;
_computedKey4 = f();
class Foo {
  static {
    [_init_a, _init_a2, _get_a, _set_a, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7, _initStatic] = babelHelpers.applyDecs2301(this, [[dec, 6, "a"], [dec, 6, "a", o => o.#B, (o, v) => o.#B = v], [dec, 6, "b"], [dec, 6, _computedKey], [dec, 6, 0], [dec, 6, _computedKey2], [dec, 6, 2n], [dec, 6, _computedKey3], [dec, 6, _computedKey4]], []).e;
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
  static get [_computedKey]() {
    return this.#D;
  }
  static set [_computedKey](v) {
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
  static get [_computedKey2]() {
    return this.#F;
  }
  static set [_computedKey2](v) {
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
  static get [_computedKey3]() {
    return this.#H;
  }
  static set [_computedKey3](v) {
    this.#H = v;
  }
  static #I = _init_computedKey7(this);
  static get [_computedKey4]() {
    return this.#I;
  }
  static set [_computedKey4](v) {
    this.#I = v;
  }
}
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
