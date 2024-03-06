let _init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _computedKey, _init_computedKey7;
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
class Foo {
  static {
    [_init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7] = babelHelpers.applyDecs2203R(this, [[dec, 5, "a"], [dec, 5, "a", function () {
      return this.#a;
    }, function (value) {
      this.#a = value;
    }], [dec, 5, "b"], [dec, 5, "c"], [dec, 5, 0], [dec, 5, 1], [dec, 5, 2n], [dec, 5, 3n], [dec, 5, _computedKey]], []).e;
  }
  static a = _init_a(this);
  static #a = _init_a2(this);
  static "b" = _init_computedKey(this);
  static ["c"] = _init_computedKey2(this);
  static 0 = _init_computedKey3(this);
  static [1] = _init_computedKey4(this);
  static 2n = _init_computedKey5(this);
  static [3n] = _init_computedKey6(this);
  static [_computedKey = babelHelpers.toPropertyKey(f())] = _init_computedKey7(this);
}
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
