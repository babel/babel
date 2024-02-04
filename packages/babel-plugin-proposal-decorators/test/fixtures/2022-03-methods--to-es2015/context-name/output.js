var _initStatic, _call_a, _computedKey, _Foo;
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
  static a() {}
  static "b"() {}
  static ["c"]() {}
  static 0() {}
  static [1]() {}
  static 2n() {}
  static [3n]() {}
  static [_computedKey]() {}
}
_Foo = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2203R(_Foo, [[dec, 7, "a"], [dec, 7, "a", function () {}], [dec, 7, "b"], [dec, 7, "c"], [dec, 7, 0], [dec, 7, 1], [dec, 7, 2n], [dec, 7, 3n], [dec, 7, _computedKey]], []).e;
  _initStatic(_Foo);
})();
var _a = {
  writable: true,
  value: _call_a
};
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
