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
  static get a() {}
  static get "b"() {}
  static get ["c"]() {}
  static get 0() {}
  static get [1]() {}
  static get 2n() {}
  static get [3n]() {}
  static get [_computedKey]() {}
}
_Foo = Foo;
function _get_a() {
  return _call_a(this);
}
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2311(_Foo, [], [[dec, 11, "a"], [dec, 11, "a", function () {}], [dec, 11, "b"], [dec, 11, "c"], [dec, 11, 0], [dec, 11, 1], [dec, 11, 2n], [dec, 11, 3n], [dec, 11, _computedKey]]).e;
  _initStatic(_Foo);
})();
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
