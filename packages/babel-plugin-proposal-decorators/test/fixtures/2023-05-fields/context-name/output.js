var _init_a, _init_a2, _init_computedKey, _computedKey, _init_computedKey2, _init_computedKey3, _computedKey2, _init_computedKey4, _init_computedKey5, _computedKey3, _init_computedKey6, _computedKey4, _init_computedKey7;
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
    [_init_a, _init_a2, _init_computedKey, _init_computedKey2, _init_computedKey3, _init_computedKey4, _init_computedKey5, _init_computedKey6, _init_computedKey7] = babelHelpers.applyDecs2305(this, [[dec, 8, "a"], [dec, 8, "a", o => o.#a, (o, v) => o.#a = v], [dec, 8, "b"], [dec, 8, _computedKey], [dec, 8, 0], [dec, 8, _computedKey2], [dec, 8, 2n], [dec, 8, _computedKey3], [dec, 8, _computedKey4]], []).e;
  }
  static a = _init_a(this);
  static #a = _init_a2(this);
  static "b" = _init_computedKey(this);
  static [_computedKey] = _init_computedKey2(this);
  static 0 = _init_computedKey3(this);
  static [_computedKey2] = _init_computedKey4(this);
  static 2n = _init_computedKey5(this);
  static [_computedKey3] = _init_computedKey6(this);
  static [_computedKey4] = _init_computedKey7(this);
}
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
