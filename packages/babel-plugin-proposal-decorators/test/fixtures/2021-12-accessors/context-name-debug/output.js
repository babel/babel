var _computedKey, _init_computedKey, _initStatic;
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
    [_init_computedKey, _initStatic] = babelHelpers.applyDecs(this, [[dec, 6, _computedKey]], []);
    _initStatic(this);
  }
  static #A = _init_computedKey(this);
  static get [_computedKey]() {
    return this.#A;
  }
  static set [_computedKey](v) {
    this.#A = v;
  }
}
expect(logs).toStrictEqual(["computing f", "f()"]);
