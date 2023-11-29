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
    [_call_a, _initStatic] = babelHelpers.applyDecs(this, [[dec, 9, "a"], [dec, 9, "a", function (v) {}], [dec, 9, "b"], [dec, 9, _computedKey], [dec, 9, 0], [dec, 9, _computedKey2], [dec, 9, 2n], [dec, 9, _computedKey3], [dec, 9, _computedKey4]], []);
    _initStatic(this);
  }
  static set a(v) {}
  static set #a(v) {
    _call_a(this, v);
  }
  static set "b"(v) {}
  static set [_computedKey](v) {}
  static set 0(v) {}
  static set [_computedKey2](v) {}
  static set 2n(v) {}
  static set [_computedKey3](v) {}
  static set [_computedKey4](v) {}
}
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
