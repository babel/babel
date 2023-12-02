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
  static get a() {}
  static get "b"() {}
  static get [_computedKey]() {}
  static get 0() {}
  static get [_computedKey2]() {}
  static get 2n() {}
  static get [_computedKey3]() {}
  static get [_computedKey4]() {}
}
_class = Foo;
function _get_a() {
  return _call_a(this);
}
var _a = {
  get: _get_a,
  set: void 0
};
(() => {
  [_call_a, _initStatic] = babelHelpers.applyDecs(_class, [[dec, 8, "a"], [dec, 8, "a", function () {}], [dec, 8, "b"], [dec, 8, _computedKey], [dec, 8, 0], [dec, 8, _computedKey2], [dec, 8, 2n], [dec, 8, _computedKey3], [dec, 8, _computedKey4]], []);
  _initStatic(_class);
})();
expect(logs).toStrictEqual(["computing f", "a", "#a", "b", "c", "0", "1", "2", "3", "f()"]);
