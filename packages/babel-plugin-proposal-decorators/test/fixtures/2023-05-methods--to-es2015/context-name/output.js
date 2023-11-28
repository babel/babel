var _call_a, _computedKey, _computedKey2, _computedKey3, _computedKey4, _initStatic, _class;
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
  static a() {}
  static "b"() {}
  static [_computedKey]() {}
  static 0() {}
  static [_computedKey2]() {}
  static 2n() {}
  static [_computedKey3]() {}
  static [_computedKey4]() {}
}
_class = Foo;
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 10, "a"], [dec, 10, "a", function () {}], [dec, 10, "b"], [dec, 10, _computedKey], [dec, 10, 0], [dec, 10, _computedKey2], [dec, 10, 2n], [dec, 10, _computedKey3], [dec, 10, _computedKey4]], []).e;
  _initStatic(_class);
})();
var _a = {
  writable: true,
  value: _call_a
};
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
