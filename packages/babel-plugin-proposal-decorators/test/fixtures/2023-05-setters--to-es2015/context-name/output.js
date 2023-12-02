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
  static set a(v) {}
  static set "b"(v) {}
  static set [_computedKey](v) {}
  static set 0(v) {}
  static set [_computedKey2](v) {}
  static set 2n(v) {}
  static set [_computedKey3](v) {}
  static set [_computedKey4](v) {}
}
_class = Foo;
function _set_a(v) {
  _call_a(this, v);
}
var _a = {
  get: void 0,
  set: _set_a
};
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2305(_class, [[dec, 12, "a"], [dec, 12, "a", function (v) {}], [dec, 12, "b"], [dec, 12, _computedKey], [dec, 12, 0], [dec, 12, _computedKey2], [dec, 12, 2n], [dec, 12, _computedKey3], [dec, 12, _computedKey4]], []).e;
  _initStatic(_class);
})();
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
