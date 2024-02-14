var _initStatic, _call_a, _computedKey;
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
    [_call_a, _initStatic] = babelHelpers.applyDecs2311(this, [], [[dec, 10, "a"], [dec, 10, "a", function () {}], [dec, 10, "b"], [dec, 10, "c"], [dec, 10, 0], [dec, 10, 1], [dec, 10, 2n], [dec, 10, 3n], [dec, 10, _computedKey]]).e;
    _initStatic(this);
  }
  static #a = _call_a;
  static a() {}
  static "b"() {}
  static ["c"]() {}
  static 0() {}
  static [1]() {}
  static 2n() {}
  static [3n]() {}
  static [_computedKey]() {}
}
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
