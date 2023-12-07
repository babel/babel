var _call_a, _computedKey, _initStatic;
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
_computedKey = f();
class Foo {
  static {
    [_call_a, _initStatic] = babelHelpers.applyDecs2301(this, [[dec, 7, "a"], [dec, 7, "a", function () {}], [dec, 7, "b"], [dec, 7, "c"], [dec, 7, 0], [dec, 7, 1], [dec, 7, 2n], [dec, 7, 3n], [dec, 7, _computedKey]], []).e;
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
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
