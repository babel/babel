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
  static set a(v) {}
  static set "b"(v) {}
  static set ["c"](v) {}
  static set 0(v) {}
  static set [1](v) {}
  static set 2n(v) {}
  static set [3n](v) {}
  static set [_computedKey](v) {}
}
_Foo = Foo;
function _set_a(v) {
  _call_a(this, v);
}
var _a = {
  get: void 0,
  set: _set_a
};
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs2301(_Foo, [[dec, 9, "a"], [dec, 9, "a", function (v) {}], [dec, 9, "b"], [dec, 9, "c"], [dec, 9, 0], [dec, 9, 1], [dec, 9, 2n], [dec, 9, 3n], [dec, 9, _computedKey]], []).e;
  _initStatic(_Foo);
})();
expect(logs).toStrictEqual(["computing f", "calling toPrimitive", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
