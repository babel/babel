var _call_a, _computedKey, _computedKey2, _computedKey3, _computedKey4, _initStatic;
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
    [_call_a, _initStatic] = babelHelpers.applyDecs2305(this, [[dec, 11, "a"], [dec, 11, "a", function () {}], [dec, 11, "b"], [dec, 11, _computedKey], [dec, 11, 0], [dec, 11, _computedKey2], [dec, 11, 2n], [dec, 11, _computedKey3], [dec, 11, _computedKey4]], []).e;
    _initStatic(this);
  }
  static get a() {}
  static get #a() {
    return _call_a(this);
  }
  static get "b"() {}
  static get [_computedKey]() {}
  static get 0() {}
  static get [_computedKey2]() {}
  static get 2n() {}
  static get [_computedKey3]() {}
  static get [_computedKey4]() {}
}
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
